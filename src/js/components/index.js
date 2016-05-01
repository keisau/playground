import React from 'react'

export const Root = ({ children }) => <div id='rootContainer'>{ React.Children.only(children) }</div>
export const Index = () => <div>
	hello

</div>
