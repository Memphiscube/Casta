-- Ensure accounts created before the CASTA schema was installed receive
-- the same profile, wallet and rewards records as newly registered players.
insert into public.profiles (id, username)
select
  users.id,
  left(
    case
      when char_length(
        coalesce(
          nullif(users.raw_user_meta_data ->> 'username', ''),
          split_part(users.email, '@', 1),
          'Player'
        )
      ) >= 2
        then coalesce(
          nullif(users.raw_user_meta_data ->> 'username', ''),
          split_part(users.email, '@', 1),
          'Player'
        )
      else 'Player'
    end,
    30
  )
from auth.users as users
on conflict (id) do nothing;

insert into public.wallets (user_id, balance)
select id, 5000
from auth.users
on conflict (user_id) do nothing;

insert into public.daily_rewards (user_id)
select id
from auth.users
on conflict (user_id) do nothing;
