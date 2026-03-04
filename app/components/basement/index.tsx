export default function Basement() {
  // Массив с данными для блоков ссылок
  const linkBlocks = [
    {
      title: "Контакты",
      links: [
        { text: "Вконтакте", href: "#", external: true },
        { text: "Телеграм", href: "#", external: true },
        { text: "Фейсбук", href: "#", external: true }
      ]
    },
    {
      title: "Почта",
      links: [
        { text: "balibas1@yandex.ru", href: "mailto:balibas1@yandex.ru" }
      ]
    },
    {
      title: "Дополнительные ссылки",
      links: [
        { text: "Когтеточки", href: "https://vk.com/kogteto4kisyktyvkar", external: true },
        { text: "Праздничная атрибутика", href: "https://vk.com/vividribbon", external: true }
      ]
    },
    {
      title: "Разработка и поддержка сайта",
      links: [
        { text: "SoftByte", href: "https://soft-byte-learn.vercel.app/", external: true }
      ]
    }
  ];

  return (
    <section id="basement">
      <div className="basement">
        <div className="basement-links">
          {linkBlocks.map((block, index) => (
            <div key={index} className="block-links">
              <span>{block.title}</span>
              {block.links.map((link, linkIndex) => (
                <a 
                  key={linkIndex}
                  href={link.href}
                  {...(link.external && {
                    target: "_blank",
                    rel: "noopener noreferrer"
                  })}
                >
                  {link.text}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="text-logo">Large Minion</div>
      </div>
    </section>
  );
}