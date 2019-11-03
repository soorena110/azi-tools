import * as React from 'react';
import {EventManager} from "./Events";

export function eventManagerHocCreator<THandler, TEvent>(eventHandler: EventManager<THandler, TEvent>) {


    return function connectToEvent(eventName: TEvent) {

        return function <TComponent>(WrappedComponent: TComponent) {

            class SubscribedComponent extends React.Component<any> {
                constructor(props: any) {
                    super(props);
                    this._handleChange = this._handleChange.bind(this);

                    eventHandler.addEventListener(eventName, this._handleChange as any)
                }

                componentWillUnmount() {
                    eventHandler.addEventListener(eventName, this._handleChange as any)
                }

                _handleChange() {
                    this.setState({})
                }

                render() {
                    const {forwardedRef, ...rest} = this.props;
                    return React.createElement(WrappedComponent as any, {...rest, ref: forwardedRef});
                }
            }

            const forwardRef = React.forwardRef((props: any, ref) => {
                return <SubscribedComponent {...props} forwardedRef={ref}/>;
            });

            const name = (WrappedComponent as any).displayName || (WrappedComponent as any).name;
            forwardRef.displayName = `SubscribedTo:${eventHandler.name}(${name})`;
            return forwardRef as any as TComponent;
        }

    }

}