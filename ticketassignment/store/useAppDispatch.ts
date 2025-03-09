/**
 * Custom hook to provide type-safe access to the Redux dispatch function.
 * Uses the AppDispatch type from the Redux store to ensure type safety.
 */

import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";

/**
 * Custom hook that returns the Redux dispatch function with the correct type.
 * @returns {AppDispatch} The Redux dispatch function.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;