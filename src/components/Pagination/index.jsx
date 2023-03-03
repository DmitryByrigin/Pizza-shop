import React from 'react';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import {setCurrentPage} from '../../redux/filter/slice';
import {useDispatch} from 'react-redux';

export const Pagination = () => {
    const dispatch = useDispatch();
    return (
        <ReactPaginate
            className={styles.root}
            nextLabel=">"
            onPageChange={(id) => dispatch(setCurrentPage(id.selected + 1))}
            pageRangeDisplayed={4}
            marginPagesDisplayed={2}
            pageCount={3}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            // previousClassName="page-item"
            // previousLinkClassName="page-link"
            // nextClassName="page-item"
            // nextLinkClassName="page-link"
            // breakLabel="..."
            // breakClassName="page-item"
            // breakLinkClassName="page-link"
            // containerClassName="pagination"
            // activeClassName="selected"
            // renderOnZeroPageCount={null}
            // forcePage={changePage - 1}
        />
    );
};
