import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  handleCloseModal: () => void;
}

const Modal = (props: PropsWithChildren<ModalProps>) => {
  return (
    <>
      <div
        className={`z-40 h-screen w-screen bg-gray-500 fixed top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 opacity-50`}
        onClick={props.handleCloseModal}
      ></div>
      <div className="z-50 fixed top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 bg-stone-700 p-12 rounded-xl">
        <button
          className="absolute top-2 right-2"
          onClick={props.handleCloseModal}
        >
          <XMarkIcon className="h-6 w-6 text-stone-300" />
        </button>
        {props.children}
      </div>
    </>
  );
};

export const useModal = (children: JSX.Element) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    showModal && (document.body.style.overflow = "hidden");
    !showModal && (document.body.style.overflow = "unset");
  }, [showModal]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const modalPortal =
    showModal &&
    createPortal(
      <Modal handleCloseModal={closeModal}>{children}</Modal>,
      document.body
    );

  return { openModal, modalPortal };
};

export default Modal;
