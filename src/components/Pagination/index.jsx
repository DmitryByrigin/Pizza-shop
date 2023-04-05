import React from 'react';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

export const Pagination = ({currentPage, onChangePage}) => {
    return (
        <ReactPaginate
            className={styles.root}
            nextLabel=">"
            onPageChange={(id) => onChangePage(id.selected + 1)}
            pageRangeDisplayed={4}
            marginPagesDisplayed={2}
            pageCount={3}
            forcePage={currentPage - 1}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
        />
    );
};
