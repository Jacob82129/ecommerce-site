import styled from 'styled-components';


// import { ReactComponent as ShoppingIconSVG } from '../../assets/shopping-bag.svg';

// export const ShoppingIcon = styled(ShoppingSvg)`
// //     width: 24px;
// //     height: 24px;`;

// Uncomment the lines above if you want to use the SVG as a React component

export const ShoppingIconImg = styled.img`
    width: 40px;
    height: 40px;
`;

export const IconContainer = styled.div`
    width: 45px;
    height: 45px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const ItemCounts = styled.span`
    position: absolute;
    font-size: 12px;
    font-weight: bold;
    bottom: 12px;
`;


