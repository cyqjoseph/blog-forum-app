import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../state";

// Typed useSelector function for type safety
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
