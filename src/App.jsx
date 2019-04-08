import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import InfoIcon from "@material-ui/icons/Info";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import watsonService from './watsonService.js';

const style = theme => ({
    appBar: {
        top: 'auto',
        bottom: 0,
        height: "70px"
    },
    root: {
        padding: "25px",
        paddingBottom: "70px"
    },
    message: {
        height: "auto",
        width: "150px",
        padding: "15px",
        marginBottom: "15px"
    },
    form: {
        width: "100%"
    },
    spinner: {
        width: "100px",
        height: "100px"
    },
    info: {
        position: "fixed",
        top: 0,
        right: 0
    },
    link: {
        textDecoration: "none",
        color: theme.palette.primary.main
    }
})

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            inputText: "",
            context: null,
            loading: false,
        };
    }

    _addMessage = message => {
        const messages = this.state.messages.slice();
        messages.push(message);

        this.setState({ messages: messages });
    }

    _handleOnTextChange = event => {
        this.setState({ inputText: event.target.value });
    }

    _handleOnSubmitForm = event => {
        event.preventDefault();

        this._handleOnSendMessageClick();
    }

    _handleOnSendMessageClick = () => {
        const message = {
            mine: true,
            text: this.state.inputText
        }

        this._addMessage(message);
        this.setState({ inputText: "" });

        this.setState({ loading: true });
        const watson = new watsonService();
        watson.sendMessage(message.text, this.state.context).then(response => {
            this.setState({ loading: false, context: response.context });
            const responseMessage = {
                mine: false,
                text: response.output.text
            }

            this._addMessage(responseMessage);
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <>
                <Grid
                    className={classes.root}
                    direction="column"
                    container>
                    {
                        this.state.messages.map((message, index) => (
                            <Grid
                                key={index}
                                justify={(message.mine) ? "flex-end" : "flex-start"}
                                container>
                                <Grid item>
                                    <Paper className={classes.message}>
                                        <Typography variant="body1">
                                            {message.text}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        ))
                    }
                    {this.state.loading &&
                        <Grid
                            justify="flex-start"
                            container>
                            <Grid item>
                                <img
                                    className={classes.spinner}
                                    src="images/typing_spinner.gif"
                                    alt="escrevendo" />
                            </Grid>
                        </Grid>
                    }
                </Grid>
                <AppBar
                    className={classes.appBar}
                    position="fixed" >
                    <Toolbar>
                        <form
                            onSubmit={this._handleOnSubmitForm}
                            className={classes.form} >
                            <TextField
                                label="Digite sua mensagem aqui"
                                value={this.state.inputText}
                                onChange={this._handleOnTextChange}
                                fullWidth />
                        </form>
                        <IconButton onClick={this._handleOnSendMessageClick}>
                            <SendIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Tooltip
                    title={
                        <React.Fragment>
                            <Typography
                                variant="caption"
                                color="primary">
                                Background image by <a className={classes.link} href="https://pixabay.com/users/peri_priatna-8463731/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3407787">Peri Priatna</a> from <a className={classes.link} href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3407787">Pixabay</a>
                            </Typography>
                        </React.Fragment>
                    }
                    placement="left-end">
                    <InfoIcon color="primary" className={classes.info} />
                </Tooltip>
            </>
        );
    }
}

export default withStyles(style)(App);
