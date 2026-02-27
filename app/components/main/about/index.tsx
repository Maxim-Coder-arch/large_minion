import AboutContent from "./content"
import SvgImage from "./image"

const About = () => {
    return (
        <section id="about">
          <div className="about">
            <AboutContent />
              <SvgImage />
          </div>
        </section>
    )
}

export default About