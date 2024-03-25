import MyPageTitle from "@/components/mypage/MyPageTitle";
import BookmarkFeed from "./BookmarkFeed";
import FunctionProgress from "@/utils/FunctionProgress";

function MyBookmark() {
  return (
    <div>
      <MyPageTitle text="북마크" />
      <div className="grid grid-cols-2 lg:grid-cols-3 my-5 gap-3 relative">
        <BookmarkFeed />
        <BookmarkFeed />
        <div className="absolute w-full h-screen top-0 bg-black/70 z-10 flex justify-center items-center flex-col">
          <FunctionProgress />
          <span className="text-white">기능 구현 진행중 입니다.</span>
        </div>
      </div>
    </div>
  );
}

export default MyBookmark;
