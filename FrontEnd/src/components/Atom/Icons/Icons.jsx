import React, {Suspense, useMemo} from 'react';

const SVG = {
  searchIcon: React.lazy(() => import('../../../assets/svgs/search.svg')),
  plusIcon : React.lazy(() => import('../../../assets/svgs/plus.svg')),
  enterIcon :  React.lazy(() => import('../../../assets/svgs/enter.svg')),
  closeIcon : React.lazy(()=> import('../../../assets/svgs/close.svg')),
  fastForwardIcon: React.lazy(()=> import('../../../assets/svgs/fast-forward.svg')),
  caretRightIcon: React.lazy(()=>import('../../../assets/svgs/caret-right.svg')),
  brushIcon : React.lazy(()=>import('../../../assets/svgs/brush.svg')),
  circleIcon : React.lazy(()=>import('../../../assets/svgs/circle.svg')),
  eraserIcon : React.lazy(()=>import('../../../assets/svgs/eraser.svg')),
  paintBucketIcon : React.lazy(()=>import('../../../assets/svgs/paint-bucket.svg')),
  paletteIcon: React.lazy(()=>import('../../../assets/svgs/palette.svg')),
  randomIcon : React.lazy(()=>import('../../../assets/svgs/random.svg')),
  squareIcon : React.lazy(()=>import('../../../assets/svgs/square.svg')),
  exitIcon : React.lazy(()=>import('../../../assets/svgs/exit.svg'))
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
