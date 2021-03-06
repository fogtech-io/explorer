import * as React from "react";

import IconButton from "@material-ui/core/IconButton/IconButton";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';

import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";

const actionsStyles = (theme: Theme) => createStyles({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
});

interface TablePaginationActionsProps extends WithStyles {
    classes: {
        root: string
    };
    count: number;
    page: number;
    rowsPerPage: number;

    onChangePage(event: any, page: number): void;
}

class TablePaginationActions extends React.Component<TablePaginationActionsProps, any> {
    constructor(props: any) {
        super(props);

        this.handleFirstPageButtonClick = this.handleFirstPageButtonClick.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
        this.handleLastPageButtonClick = this.handleLastPageButtonClick.bind(this);
    }

    public handleFirstPageButtonClick(event: any) {
        this.props.onChangePage(event, 0);
    }

    public handleBackButtonClick(event: any) {
        this.props.onChangePage(
            event,
            this.props.page - 1
        );
    }

    public handleNextButtonClick(event: any) {
        this.props.onChangePage(
            event,
            this.props.page + 1);
    }

    public handleLastPageButtonClick(event: any) {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
        );
    }

    public render() {
        const {classes, count, page, rowsPerPage} = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page">
                    <FirstPageIcon/>
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page">
                    <KeyboardArrowLeft/>
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page">
                    <KeyboardArrowRight/>
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page">
                    <LastPageIcon/>
                </IconButton>
            </div>
        );
    }
}

// TODO: fix naming
export const tablePaginationActionsWrapped = withStyles(actionsStyles)(TablePaginationActions);
