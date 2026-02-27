import Link from "next/link";

const SideAbout = () => {
  return (
    <div className="side-about">
      <div className="feedback">
        <Link href="#">
          <div className="reach"></div>
          <span>Связаться</span>
        </Link>
      </div>
      <div className="breeder-block">
        <span>Людмила</span>
        <div className="breeder-avatar"></div>
      </div>
    </div>
  )
}

export default SideAbout;