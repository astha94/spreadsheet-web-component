import React from 'react'
import PropTypes from 'prop-types'

/**
 * Cell represents the atomic element of a table
 */
export default class Cell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            value: props.value,

        }
        this.display = this.determineDisplay(
            { x: props.x, y: props.y },
            props.value
        )
    }

    /**
     * Add listener to the `unselectAll` event used to broadcast the
     * unselect all event
     */
    componentDidMount() {
        window.document.addEventListener('unselectAll',
            this.handleUnselectAll)
    }

    /**
     * Remove the `unselectAll` event listener added in
     * `componentDidMount()`
     */
    componentWillUnmount() {
        window.document.removeEventListener('unselectAll',
            this.handleUnselectAll)
    }

    /**
     * When a Cell value changes, re-determine the display value
     * by calling the formula calculation
     *
     * Here we can calculate whether the value is if correct type
     */
    onChange = (e) => {

        this.setState({ value: e.target.value })
        this.display = this.determineDisplay(
            { x: this.props.x, y: this.props.y }, e.target.value)
    }

    /**
     * Handle pressing a key when the Cell is an input element
     */
    onKeyPressOnInput = (e) => {
        if (e.key === 'Enter') {
            this.hasNewValue(e.target.value)
        }
    }

    /**
     * Handle moving away from a cell, stores the new value
     */
    onBlur = (e) => {
        this.hasNewValue(e.target.value)
    }

    /**
     * Used by `componentDid(Un)Mount`, handles the `unselectAll`
     * event response
     */
    handleUnselectAll = () => {
        if (this.state.selected || this.state.editing) {
            this.setState({ selected: false, editing: false })
        }
    }

    /**
     * Called by the `onBlur` or `onKeyPressOnInput` event handlers,
     * it escalates the value changed event, and restore the editing
     * state to `false`.
     */
    hasNewValue = (value) => {
        this.props.onChangedValue(
            {
                x: this.props.x,
                y: this.props.y,
            },
            value,
        )
        this.setState({ editing: false })
    }

    /**
     * Emits the `unselectAll` event, used to tell all the other
     * cells to unselect
     */
    emitUnselectAllEvent = () => {
        const unselectAllEvent = new Event('unselectAll')
        window.document.dispatchEvent(unselectAllEvent)
    }


    /**
     * Handle clicking a Cell.
     */
    clicked = () => {
        this.emitUnselectAllEvent()
        this.setState({ editing: true, selected: true })

    }

    determineDisplay = ({ x, y }, value) => {
        return value
    }

    /**
     * Calculates a cell's CSS values
     */
    calculateCss = () => {
        const css = {
            width: '80px',
            padding: '4px',
            margin: '0',
            height: '25px',
            boxSizing: 'border-box',
            position: 'relative',
            display: 'inline-block',
            color: 'black',
            border: '1px solid #cacaca',
            textAlign: 'left',
            verticalAlign: 'top',
            fontSize: '14px',
            lineHeight: '15px',
            overflow: 'hidden',
            fontFamily: 'Calibri, \'Segoe UI\', Thonburi, Arial, Verdana, sans-serif',
        }

        if (this.props.y === 0) {
            css.textAlign = 'center'
            css.backgroundColor = '#f0f0f0'
            css.fontWeight = 'bold'
        }

        return css
    }

    render() {
        const css = this.calculateCss()

        if (this.state.selected) {
            css.outlineColor = 'lightblue'
            css.outlineStyle = 'dotted'
        }

        if (this.state.editing) {
            return (
                <input
                    style={css}
                    type="text"
                    onBlur={this.onBlur}
                    onKeyPress={this.onKeyPressOnInput}
                    value={this.state.value}
                    onChange={this.onChange}
                    autoFocus
                />
            )
        }

        return (
            <span
                id={'main_table'}
                onClick={e => this.clicked(e)}
                style={css}
                role="presentation"
            >
        {this.display}
      </span>

        )
    }
}

Cell.propTypes = {
    onChangedValue: PropTypes.func.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
}