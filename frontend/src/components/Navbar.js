import React from 'react';
import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { getTruncatedAddress } from '../helpers';
import { getSignerAddress } from '../provider';
import Button from './Button';
import styles from './styles/Header.module.css';

import AddPostComponent from './AddPostComponent/AddPostComponent';
import Modal from './Modal/Modal';
import InputFieldTitle from './InputField/InputFieldTitle';
import InputFieldBody from './InputField/InputFieldBody';

export default function Navbar() {
  const { setWalletAddress, walletAddress } = useWallet();
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [inputFieldTitle, setInputFieldTitle] = useState('');
  const [inputFieldBody, setInputFieldBody] = useState('');

  // Connect
  const handleConnect = async () => {
    const ethereum = window.ethereum;
    if (ethereum) {
      await ethereum.request({ method: 'eth_requestAccounts' });
      const address = await getSignerAddress();
      if (address) {
        setWalletAddress(address);
      }
    }
  };

  // Modal
  const openModal = () => {
    setShowAddPostModal(true);
  };
  const closeModal = () => {
    setShowAddPostModal(false);
  };

  // Post
  const onClickPost = () => {
    const PostData = {
      userWalletAddress: walletAddress,
      time: new Date().getTime(),
      title: inputFieldTitle,
      body: inputFieldBody,
    };
    console.log(PostData);
    setInputFieldTitle('');
    setInputFieldBody('');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>KNOledge</div>
      <div className="nav-links">
        <Button
          onClick={() => {
            setShowAddPostModal(true);
          }}
        >
          Post
        </Button>
        {showAddPostModal ? (
          <Modal
            open={openModal}
            close={closeModal}
            header="Make a new Post"
            onPost={onClickPost}
          >
            <InputFieldTitle
              placeholder="Title"
              value={inputFieldTitle}
              setInputFieldTitle={setInputFieldTitle}
            />
            <InputFieldBody
              placeholder="Body"
              value={inputFieldBody}
              setInputFieldBody={setInputFieldBody}
            />
          </Modal>
        ) : null}

        {walletAddress ? (
          <span>{getTruncatedAddress(walletAddress)}</span>
        ) : (
          <Button onClick={handleConnect}>Connect</Button>
        )}
      </div>
    </nav>
  );
}
