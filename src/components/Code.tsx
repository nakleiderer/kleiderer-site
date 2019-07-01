import {
    createStyles,
    Theme,
    withStyles,
    WithStyles,
} from '@material-ui/core/styles'
import React from 'react'
import Highlight, { defaultProps } from "prism-react-renderer";
import classNames from "classnames";

const styles = (theme: Theme) =>
    createStyles({
        highlight: {
            padding: theme.spacing.unit * 2
        }
    })

interface Props extends WithStyles<typeof styles> {
    children: any
}

const Code = (props: Props) => {
    const className = props.children.props.className || "";
    const matches = className.match(/language-(?<lang>.*)/);
    return (
        <Highlight
            {...defaultProps}
            code={props.children.props.children.trim()}
            language={matches && matches.groups && matches.groups.lang ? matches.groups.lang : ""}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={classNames(className, props.classes.highlight)} style={style}>
                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span {...getTokenProps({ token, key })}></span>
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    )
}

export default withStyles(styles)(Code)
