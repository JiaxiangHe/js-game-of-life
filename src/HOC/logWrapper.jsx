import React from "react";

export default (TargetComponent) => {
    class LogWrapper extends React.Component {
        componentWillReceiveProps(nextProps) {
            console.log('odd:', this.props);
            console.log('new:', nextProps);
        }

        render() {
            const { forwardedRef, ...rest } = this.props
            return <TargetComponent ref={forwardedRef} {...rest} />;
        }
    }

    return React.forwardRef((props, ref) => {
        return <LogWrapper forwardedRef={ref} {...props} />
    });
}