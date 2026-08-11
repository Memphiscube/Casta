import Image from "next/image";

const floatingElements = [
  { className: "site-floater-one", src: "/games/jungle-wheel-coins.png", size: 118 },
  { className: "site-floater-two", src: "/games/jungle-wheel-amethyst.png", size: 96 },
  { className: "site-floater-three", src: "/games/jungle-wheel-temple-crown.png", size: 112 },
  { className: "site-floater-four", src: "/games/jungle-wheel-treasure-chest.png", size: 104 },
  { className: "site-floater-five", src: "/games/jungle-wheel-amethyst.png", size: 76 },
  { className: "site-floater-six", src: "/games/jungle-wheel-coins.png", size: 92 },
  { className: "site-floater-seven", src: "/games/jungle-wheel-temple-crown.png", size: 82 },
  { className: "site-floater-eight", src: "/games/jungle-wheel-treasure-chest.png", size: 88 },
] as const;

export function FloatingBackground() {
  return (
    <div className="site-floating-background" aria-hidden="true">
      {floatingElements.map((element) => (
        <span className={`site-floater ${element.className}`} key={element.className}>
          <Image
            src={element.src}
            alt=""
            width={element.size}
            height={element.size}
            sizes={`${element.size}px`}
          />
        </span>
      ))}
    </div>
  );
}
