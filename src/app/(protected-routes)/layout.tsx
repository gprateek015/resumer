"use client";

import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "@/redux/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { updatePrevPath } from "@/redux/slice/auth";
import { PROTECTED_ROUTES } from "@/constants";
import { CircularProgress } from "@mui/material";
import Loader from "@/components/loader";
import { useSnackbar } from "notistack";
import { righteous } from "@/font-family";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const routes = useRouter();
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!isLoggedIn) {
      // enqueueSnackbar('Authentication Failed, Please login...', {
      //     preventDuplicate: true,
      //     variant: 'error',
      //     style: {
      //       fontFamily: righteous.style.fontFamily
      //     }
      //   });
      const searchParamsString = searchParams.toString();
      dispatch(updatePrevPath(`${pathname}?${searchParamsString}`));
      routes.replace("/");
    }
  }, [isLoggedIn]);

  return (
    <>
      {!isLoggedIn && PROTECTED_ROUTES.includes(pathname) ? (
        <Loader />
      ) : (
        children
      )}
    </>
  );
}
