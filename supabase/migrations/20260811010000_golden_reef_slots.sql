-- Golden Reef: server-authoritative 5x3 social slots using the shared virtual wallet.
insert into public.games (slug, title, status)
values ('golden-reef', 'Golden Reef', 'live')
on conflict (slug) do update set title = excluded.title, status = excluded.status;

create or replace function public.spin_golden_reef(p_bet integer)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_balance bigint;
  v_new_balance bigint;
  v_win bigint;
  v_roll integer;
  v_symbol text;
  v_grid text[] := array[]::text[];
  v_paylines integer[][] := array[
    array[1, 2, 3, 4, 5], array[6, 7, 8, 9, 10], array[11, 12, 13, 14, 15],
    array[1, 7, 13, 9, 5], array[11, 7, 3, 9, 15], array[1, 2, 8, 14, 15],
    array[11, 12, 8, 4, 5], array[6, 7, 3, 9, 10]
  ];
  v_line integer;
  v_column integer;
  v_first_symbol text;
  v_match_count integer;
  v_line_multiplier integer;
  v_total_multiplier integer := 0;
  v_line_cells integer[];
  v_winning_lines jsonb := '[]'::jsonb;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if p_bet not in (50, 100, 250, 500) then raise exception 'Invalid virtual coin wager'; end if;

  insert into public.wallets (user_id, balance) values (v_user_id, 5000)
  on conflict (user_id) do nothing;
  select balance into v_balance from public.wallets where user_id = v_user_id for update;
  if v_balance < p_bet then raise exception 'Not enough virtual coins'; end if;

  for v_column in 1..15 loop
    v_roll := floor(random() * 100)::integer;
    v_symbol := case when v_roll < 30 then 'pearl' when v_roll < 54 then 'starfish'
      when v_roll < 72 then 'seahorse' when v_roll < 85 then 'chest'
      when v_roll < 95 then 'aquamarine' else 'trident' end;
    v_grid := array_append(v_grid, v_symbol);
  end loop;

  for v_line in 1..8 loop
    v_first_symbol := v_grid[v_paylines[v_line][1]];
    v_match_count := 1;
    for v_column in 2..5 loop
      if v_grid[v_paylines[v_line][v_column]] = v_first_symbol then v_match_count := v_match_count + 1;
      else exit; end if;
    end loop;

    v_line_multiplier := case v_first_symbol
      when 'pearl' then case v_match_count when 3 then 1 when 4 then 2 when 5 then 4 else 0 end
      when 'starfish' then case v_match_count when 3 then 1 when 4 then 3 when 5 then 5 else 0 end
      when 'seahorse' then case v_match_count when 3 then 2 when 4 then 4 when 5 then 8 else 0 end
      when 'chest' then case v_match_count when 3 then 2 when 4 then 5 when 5 then 10 else 0 end
      when 'aquamarine' then case v_match_count when 3 then 3 when 4 then 8 when 5 then 15 else 0 end
      when 'trident' then case v_match_count when 3 then 5 when 4 then 12 when 5 then 25 else 0 end
      else 0 end;

    if v_line_multiplier > 0 then
      v_total_multiplier := v_total_multiplier + v_line_multiplier;
      v_line_cells := array[]::integer[];
      for v_column in 1..v_match_count loop
        v_line_cells := array_append(v_line_cells, v_paylines[v_line][v_column] - 1);
      end loop;
      v_winning_lines := v_winning_lines || jsonb_build_array(jsonb_build_object(
        'line_index', v_line - 1, 'symbol', v_first_symbol, 'count', v_match_count,
        'multiplier', v_line_multiplier, 'cells', v_line_cells));
    end if;
  end loop;

  v_win := p_bet::bigint * v_total_multiplier;
  v_new_balance := v_balance - p_bet + v_win;
  update public.wallets set balance = v_new_balance, updated_at = now() where user_id = v_user_id;
  update public.profiles set xp = xp + 25, level = greatest(1, ((xp + 25) / 500) + 1), updated_at = now() where id = v_user_id;
  insert into public.game_sessions (user_id, game_slug, wager, multiplier, reward, balance_after)
  values (v_user_id, 'golden-reef', p_bet, v_total_multiplier, v_win, v_new_balance);

  return jsonb_build_object('grid', v_grid, 'multiplier', v_total_multiplier, 'win', v_win,
    'balance', v_new_balance, 'winning_lines', v_winning_lines);
end;
$$;

revoke execute on function public.spin_golden_reef(integer) from public, anon;
grant execute on function public.spin_golden_reef(integer) to authenticated;
