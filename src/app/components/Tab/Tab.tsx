import React from 'react';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import "./style/Tab.css";

interface StyledTabProps {
    label: string;
}

const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        display: "none",
    }
})(Tabs);

const AntTab = withStyles((theme: Theme) =>
    createStyles({
        root: {
            textTransform: 'none',
            borderTop: '3px solid #fff',
            borderBottom: '3px solid #fff',

            '&:hover': {
                // color: '#40a9ff',
                // opacity: 1,
                borderBottom: '3px solid #e8e8e8',
            },
            '&$selected': {
                // color: '#1890ff',
                // fontWeight: theme.typography.fontWeightMedium,
                borderBottom: '3px solid #007BFF',
            },
            '&:focus': {
                // color: '#40a9ff',
            }
        },
        selected: {},
    }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);


type Props = {
    value?: any,
    onChange?: (event: React.ChangeEvent<{}>, value: any) => void,
    tabs: string[],
    className?: string,
}

const TabCustom: React.FC<Props> = (props) => {
    const { tabs, className } = props;

    return (
        <AntTabs
            value={props.value}
            onChange={props.onChange}
            indicatorColor="primary"
            variant="scrollable"
            className={"tab " + (className ? className : "")}
        >
            {
                tabs && tabs.map((tab: string, index: number) => {
                    return (
                        <AntTab label={tab} key={`tab-${index}`} />
                    )
                })
            }
        </AntTabs>
    )
}

export default TabCustom;