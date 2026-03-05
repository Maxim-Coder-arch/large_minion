import { linkBlocks } from "@/app/data/basement/basement";

export default function Basement() {

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