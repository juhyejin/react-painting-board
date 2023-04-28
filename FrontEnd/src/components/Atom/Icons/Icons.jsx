import React, {Suspense, useMemo} from 'react';

const SVG = {
  searchIcon: React.lazy(() => import('../../../assets/svgs/search.svg')),
  plusIcon : React.lazy(() => import('../../../assets/svgs/plus.svg')),
  enterIcon :  React.lazy(() => import('../../../assets/svgs/enter.svg')),
  closeIcon : React.lazy(()=> import('../../../assets/svgs/close.svg')),
  fastForwardIcon: React.lazy(()=> import('../../../assets/svgs/fast-forward.svg'))
}

const Icons = ({name, width, height, propsClassName}) => {

  const IconComponent = useMemo(() => SVG[name], [name]);

  return (
    <Suspense fallback={<></>}>
      <IconComponent width={width} height={height} className={propsClassName}/>
    </Suspense>
  );
};


Icons.defaultProps = {
  width: 20,
}


export default Icons;
