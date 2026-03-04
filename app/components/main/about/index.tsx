import Link from "next/link";
import "../../../styles/about/about.scss";

const About = () => {
    return (
      <div className="large-minion-container">
      <div className="large-minion-grid">
        
        {/* Блок 1: Название и статус */}
        <div className="large-minion-block">
          <span className="large-minion-tag">ПИТОМНИК</span>
          <h1 className="large-minion-title">
            Large <br />Minion
          </h1>
          <p className="large-minion-subtitle">Большой баловень</p>
          <p className="large-minion-text">
            Монопородный питомник мейн-кунов
          </p>
        </div>

        {/* Блок 2: Клуб и система */}
        <div className="large-minion-block">
          <span className="large-minion-tag">КЛУБ</span>
          <p className="large-minion-big-number">01</p>
          <p className="large-minion-text">
            Состоим в КЛК Kominet<br />
            Система: <span className="large-minion-accent">WCF (Европа)</span>
          </p>
          <p className="large-minion-small-text">
            Ведем деятельность согласно племенному положению клуба
          </p>
        </div>

        {/* Блок 3: Философия (Здоровье) */}
        <div className="large-minion-block">
          <span className="large-minion-tag">ФИЛОСОФИЯ</span>
          <p className="large-minion-big-number">02</p>
          <p className="large-minion-text">
            Крепкое здоровье<br />
            <span className="large-minion-accent">100%</span> соответствие стандарту
          </p>
          <p className="large-minion-small-text">
            Наша племенная работа направлена на получение потомства с идеальными внешними данными
          </p>
        </div>

        {/* Блок 4: Достижения */}
        <div className="large-minion-block">
          <span className="large-minion-tag">ДОСТИЖЕНИЯ</span>
          <p className="large-minion-big-number">03</p>
          <p className="large-minion-text">
            Победители выставок<br />
            Высокие оценки экспертов
          </p>
          <p className="large-minion-small-text">
            Неоднократно получали награды в международных рингах
          </p>
        </div>

        {/* Блок 5: Забота (Ветеринария) */}
        <div className="large-minion-block">
          <span className="large-minion-tag">ЗАБОТА</span>
          <p className="large-minion-big-number">04</p>
          <p className="large-minion-text">
            Регулярная вакцинация<br />
            Осмотр ветеринаров
          </p>
          <p className="large-minion-small-text">
            Каждый питомец получает достойный уход и содержание
          </p>
        </div>

        {/* Блок 6: Заводчик (выделяющийся блок) */}
        <div className="large-minion-block breeder-featured">
          <span className="large-minion-tag">ЗАВОДЧИК</span>
          <div className="breeder-content">
            <div className="breeder-info">
              <p className="large-minion-big-number">Людмила</p>
              <p className="large-minion-text">
                Заводчик питомника<br />
                <span className="large-minion-accent">15+ лет опыта</span>
              </p>
            </div>
            <div 
              className="breeder-avatar"
              style={{ backgroundImage: 'url(/images/hero-section/breeder.png)' }}
            />
          </div>
          <div className="breeder-contact">
            <Link 
              href="https://vk.com/im/convo/-95911846?entrypoint=community_page&tab=all" 
              target="_blank"
              className="breeder-link"
            >
              <span>Связаться с заводчиком</span>
              <span className="breeder-link-arrow">→</span>
            </Link>
          </div>
          <p className="large-minion-small-text">
            Ответим на все вопросы о питомцах, поможем с выбором и бронированием
          </p>
        </div>

      </div>
    </div>
    )
}

export default About