import { Popover } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../../responsive';
import { PopoverCategory } from '../../type/type';

const MenuItem = styled.div`
  font-size: 20px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

  const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 20px;
  padding:20px;
`;
const Line = styled.div`
  border-left: 1px solid gray;
  margin: 0px 25px;
`
const CategoryTitleContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
const CategoryTitle = styled.span`
  font-weight: 600;
  font-size:25px;
`;
const CategoryContentContainer = styled.div``;
const CategoryItemContainer = styled.div`
  margin-bottom: 15px;
  cursor: pointer;
`;

const CategoryItem = styled.span`
  color: gray;
  &:hover {
    color:black;
  }
`;
const useStyles = makeStyles((theme) => ({
    popover: {
      pointerEvents: "none",
    },
    popoverContent: {
      pointerEvents: "auto",
    },
  }));

type NavbarCategoryProp = {
    CategoryName: string;
    CategoryData: PopoverCategory[];
}

const NavbarCategory = ({CategoryName,CategoryData}:NavbarCategoryProp) => {
    const classes = useStyles();
    const [openedPopover, setOpenedPopover] = useState(false);
    const popoverAnchor = useRef(null);

    const popoverEnter = ({ currentTarget }: any) => {
        setOpenedPopover(true);
    };

    const popoverLeave = ({ currentTarget }: any) => {
        setOpenedPopover(false);
    };
    return (
        <>
        <MenuItem
            ref={popoverAnchor}
            aria-owns="mouse-over-popover"
            aria-haspopup="true"
            onMouseEnter={popoverEnter}
            onMouseLeave={popoverLeave}
          >
            {CategoryName}
        </MenuItem>
          <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
              paper: classes.popoverContent,
            }}
            open={openedPopover}
            anchorEl={popoverAnchor.current}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            PaperProps={{
              onMouseEnter: popoverEnter,
              onMouseLeave: popoverLeave,
            }}
          >
            <CategoryContainer>
              {CategoryData.map((c)=>(
                <>
                <CategoryWrapper key={c.Title}>
                  <CategoryTitleContainer>
                  <CategoryTitle>{c.Title}</CategoryTitle>
                  </CategoryTitleContainer>

                  <CategoryContentContainer>
                    {c.Category.map((column)=>(
                      <Link to={"/products/"+column.name} style={{color:"inherit",textDecoration:"none"}} key={column.name}>
                      <CategoryItemContainer key={column.name}>
                      <CategoryItem>{column.name}</CategoryItem>
                      </CategoryItemContainer>
                      </Link>
                    ))}
                  </CategoryContentContainer>
                </CategoryWrapper>
                </>
              ))}
            </CategoryContainer>
          </Popover>
          </>
    )
}

export default NavbarCategory
