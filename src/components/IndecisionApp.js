import React from 'react';

import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };
    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    };
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => option != optionToRemove)
        }));
    };
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState((prevState) => ({
            selectedOption: option
        }));
    };
    handleAddOption = (option) => {
        if(!option) {
            return 'Enter a valid option!!';
        }
        else if(this.state.options.indexOf(option) >= 0) {
            return 'Option already added';
        }

        this.setState((prevSate) => ({ options: prevSate.options.concat([option])}));
    };
    handleClearSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined}));
    };
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options){
                this.setState(() => ({options: options}));
            }
        } catch (e) {
            //do nothing
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }
    componentWillUnmount() {
        console.log('WillUnmount');
    }
    render() {
        const subtitle = 'Put your life in the hands of a computer';
        return (
            <div>
                <Header subtitle={subtitle}/>
                <div className="container container__body">
                    <Action 
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options 
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption handleAddOption={this.handleAddOption}/>
                    </div>
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                />
            </div>
        );
    }
}
