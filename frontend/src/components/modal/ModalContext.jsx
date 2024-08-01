import {createContext, useState, useContext} from 'react';
import PropTypes from "prop-types";
import GroupModal from "./GroupModal";

// Context 생성
const ModalContext = createContext();

// Context Provider
export const ModalProvider = ({children}) => {
    const [modalType, setModalType] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");
    const [modalState, setModalState] = useState("hide");
    const [modalCallback, setModalCallback] = useState(null);

    // 모달을 나타내는 함수
    const showModal = () => {
        setModalState("show");
    }

    // 모달을 숨기는 함수
    const hideModal = () => {
        setModalState("hide");
    }

    return (
        <ModalContext.Provider
            // 커스텀 훅을 이용해서 useState / 함수를 제공
            value={{setModalType, setModalTitle, setModalBody, setModalCallback, showModal, hideModal}}>
            {/*{modalType === "inform" &&*/}
            {/*    // 일반적인 알림 모달*/}
            {/*    <InformModal modalState={modalState} modalTitle={modalTitle} modalBody={modalBody}*/}
            {/*                 hideModal={hideModal}/>}*/}
            {modalType === "groupInform" &&
                <GroupModal modalState={modalState} hideModal={hideModal}/>

            }
            {children}
        </ModalContext.Provider>
    );
};

// porps 타입 지정
ModalProvider.propTypes = {
    children: PropTypes.node,
}

// 커스텀 훅
export const useModal = () => {
    return useContext(ModalContext);
};