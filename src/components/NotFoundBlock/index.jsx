import React from 'react';
import styles from './NotFoundBlock.module.scss';

function NotFoundBlock() {
    return (
        <h1 className={styles.NotFoundBlock}>
            <span>😕</span>
            <br/>
            Ничего не найдено
        </h1>
    );
}

export default NotFoundBlock;
