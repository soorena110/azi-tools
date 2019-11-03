import * as React from 'react';
import {EventManager} from "./Events";

export function eventManagerHocCreator<THandler, TEvent>(eventHandler: EventManager<THandler, TEvent>) {


    return function connectToModeChange(modeName: TEvent) {

        return function <TComponent>(WrappedComponent: TComponent) {

            class ModeSubscribedComponent extends React.Component<any> {
                constructor(props: any) {
                    super(props);
                    this._handleModeChange = this._handleModeChange.bind(this);

                    eventHandler.addEventListener(modeName, this._handleModeChange as any)
                }

                componentWillUnmount() {
                    eventHandler.addEventListener(modeName, this._handleModeChange as any)
                }

                _handleModeChange() {
                    this.setState({})
                }

                render() {
                    const {forwardedRef, ...rest} = this.props;
                    return React.createElement(WrappedComponent as any, {...rest, ref: forwardedRef});
                }
            }

            const forwardRef = React.forwardRef((props: any, ref) => {
                return <ModeSubscribedComponent {...props} forwardedRef={ref}/>;
            });

            const name = (WrappedComponent as any).displayName || (WrappedComponent as any).name;
            forwardRef.displayName = `SubscribedToModeEvents(${name})`;
            return forwardRef as any as TComponent;
        }

    }

}