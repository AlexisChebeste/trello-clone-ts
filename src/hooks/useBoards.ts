import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchBoardsByWorkspace } from "../redux/states/boardsSlice";

export function useBoards(idWorkspace?: string) {
  const dispatch = useDispatch<AppDispatch>();
  const { boards, loading } = useSelector((store: RootState) => store.boards);

  const [sortBy, setSortBy] = useState<string>("most-recent");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (idWorkspace) {
      dispatch(fetchBoardsByWorkspace(idWorkspace));
    }
  }, [dispatch, idWorkspace]);

  const filteredBoards = useMemo(() => {
    return boards
      .filter((board) => board.idWorkspace === idWorkspace && !board.isArchived)
      .sort((a, b) => {
        switch (sortBy) {
          case "most-recent":
            return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
          case "least-recent":
            return new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime();
          case "a-z":
            return a.name.localeCompare(b.name);
          case "z-a":
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
  }, [boards, idWorkspace, sortBy]);

  const boardsArchived = useMemo(() => {
    return boards.filter((board) => board.idWorkspace === idWorkspace && board.isArchived);
  }, [boards, idWorkspace]);

  return {
    filteredBoards,
    boardsArchived,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    loading,
  };
}
