import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { listType } from "../../types";

export default function BoardList() {

  const [board, setBoard] = useState([]);

  // 게시판 목록 가져오기
  const list = async () => {
    await axios.get('http://localhost:8000/data')
      .then(res => setBoard(res.data));
  }
  useEffect(() => {
    list();
  },[]);

  // 페이지 이동시 사용할 라우터
  const router = useRouter();

  return (
    <>
      <h1>공지사항</h1>
      <div>
        <div className="right">
          <button className="button" onClick={() => router.push("/board/write")} > 등  록 </button>
          <h3>총  {board.length} 건</h3>
        </div>
        <div className="thead">
          <div>
            <span className="td1">번호</span>
            <span className="td2">제목</span>
            <span className="td3">내용</span>
            <span className="td4">작성자</span>
          </div>
        </div>
        <div className="tbody">
          {board.map((content: listType, index:number) => (
            <div key={content.id} className="tr" onClick={()=>router.push(`/board/detail/${content.id}`)}>
              <span className="td1">{index+1}</span>
              <span className="td2">{content.title}</span>
              <span className="td3">{content.content}</span>
              <span className="td4">{content.userId}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}