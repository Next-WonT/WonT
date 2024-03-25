import { AiOutlineHome } from "react-icons/ai";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { PiUserCircle } from "react-icons/pi";
import Router, { useRouter } from "next/router";

function HeaderMypage() {
  const router = useRouter();
  return (
    <header className="bg-primary p-5">
      <nav className="flex justify-between gap-3">
        <button type="button" onClick={() => router.back()}>
          <IoArrowBackCircleOutline size="30px" color="#363636" />
        </button>
        <div className="flex gap-3">
          <button type="button" onClick={() => Router.push(`/main`)}>
            <AiOutlineHome size="28px" color="#363636" />
          </button>
          <button type="button" onClick={() => Router.push(`/mypage`)}>
            <PiUserCircle size="30px" color="#363636" />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default HeaderMypage;
