import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  totalPrice: {
    background: theme.palette.background.default,
    textAlign: 'right',
    display: 'block'
  },
  cartWrap: {
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
    '&:focus': {
      outline: 'none'
    }
  },
  itemText: {
    marginRight: 30,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    width: 220
  },
  cartPanel: {
    '& figure': {
      width: 120,
      height: 70,
      overflow: 'hidden',
      marginRight: theme.spacing(2),
      borderRadius: '5px',
      '& img': {
        maxWidth: '100%'
      }
    }
  },
  empty: {
    textAlign: 'center',
    padding: 20
  }
}));

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export default useStyles;
