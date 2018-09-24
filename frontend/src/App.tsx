import * as React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import HomePage from "./components/pages/home/HomePage";
import BlocksPage from "./components/pages/blocks/BlocksPage";
import BlockPage from "./components/pages/block/BlockPage";
import TransactionsPage from "./components/pages/transactions/TransactionsPage";
import TransactionPage from "./components/pages/transaction/TransactionPage";
import AddressPage from "./components/pages/address/AddressPage";
import Header from "./components/header/Header";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {theme} from "./theme";


class App extends React.Component {
    public render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Router forceRefresh={true}>
                    <div className="App">
                        <Header/>
                        <Switch>
                            <Route exact path="/" component={HomePage}/>
                            <Route path="/blocks" component={BlocksPage}/>
                            <Route exact path="/block/:blockHash" component={BlockPage}/>
                            <Route path="/transactions" component={TransactionsPage}/>
                            <Route path="/transaction/:txHash" component={TransactionPage}/>
                            <Route path="/address/:address" component={AddressPage}/>
                        </Switch>
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;