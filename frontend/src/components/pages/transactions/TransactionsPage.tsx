import * as React from "react";

import {Transaction as Tx} from "../../../types/Transaction";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import {Link} from "react-router-dom";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import {TablePaginationActionsWrapped} from "../blocks/parts/TablePaginationActions";
import TableFooter from "@material-ui/core/TableFooter/TableFooter";
import Paper from "@material-ui/core/Paper/Paper";


interface TransactionState {
    transactions: Tx[],
    loading: boolean,
    error?: never

    page: number,
    rowsPerPage: number,
}

const START_PAGE = 0;
const DEFAULT_ROWS_PER_PAGE = 10;

class TransactionsPage extends React.Component<any, TransactionState> {
    constructor(props: any) {
        super(props);

        this.loadTransactions = this.loadTransactions.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    state = {
        transactions: [],
        loading: false,
        page: START_PAGE,
        rowsPerPage: DEFAULT_ROWS_PER_PAGE,
    } as TransactionState;

    componentDidMount() {
        this.loadTransactions()
    }

    loadTransactions() {
        const limit = this.state.rowsPerPage;
        const offset = this.state.page * this.state.rowsPerPage;
        const url = "http://localhost:3544/transactions?order=blockNumber&limit=" + limit + "&offset=" + offset;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })

            .then(result => {
                this.setState({
                    transactions: result,
                    loading: true,
                } as TransactionState);
            })
            .catch(err => {
                this.setState({
                    loading: true,
                    error: err,
                } as TransactionState);
            })
    }

    handleChangePage(event: any, page: number) {
        this.setState({
            page: page,
            loading: false,
        } as TransactionState, this.loadTransactions);
    }

    handleChangeRowsPerPage() {

    }

    render() {
        const {page, rowsPerPage} = this.state;

        if (this.state.error != null){
            return (
                <Paper>
                    error! {this.state.error}
                </Paper>
            )
        }

        if (!this.state.loading){
            return (
                <Paper>
                    <h1>Loading...</h1>
                </Paper>
            )
        }

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>TxHash</TableCell>
                        <TableCell>Block</TableCell>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.transactions.map(row => {
                        return (
                            <TableRow key={row.hash}>
                                <TableCell>
                                    <Link to={"/transaction/" + row.hash}>{row.hash}</Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={"/block/" + row.blockHash}>{row.blockNumber}</Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={"/address/" + row.from}>{row.from}</Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={"/address/" + row.to}>{row.to}</Link>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            colSpan={3}
                            count={2000000}
                            // TODO: load state before & in time:
                            // колличество транзакций будет постоянно меняться
                            // при использовании offset на страницу будут догружаться
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActionsWrapped}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        )
    }
}

export default TransactionsPage;