import styled from 'styled-components';

export default function Modal({ isOpen, onClose, children }) {
    const handleModalClose = () => {
        onClose();
    };
    
    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={handleModalClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={handleModalClose}>X</CloseButton>
                {children}
            </ModalContent>
        </ModalOverlay>
    );

}

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: white;
    padding : 24px;
    border-radius: 8px;
    width : 400px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
    align-items: center;
`

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #333;

    &:hover {
        color: #000;
    }
`;


