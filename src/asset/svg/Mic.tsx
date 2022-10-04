function Mic({ ...restProps }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='30'
      height='30'
      viewBox='0 0 50 57'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...restProps}
    >
      <g filter='url(#filter0_d_451_917)'>
        <path
          d='M25 2.08333C23.3424 2.08333 21.7527 2.74181 20.5806 3.91391C19.4085 5.08602 18.75 6.67573 18.75 8.33333V25C18.75 26.6576 19.4085 28.2473 20.5806 29.4194C21.7527 30.5915 23.3424 31.25 25 31.25C26.6576 31.25 28.2473 30.5915 29.4194 29.4194C30.5915 28.2473 31.25 26.6576 31.25 25V8.33333C31.25 6.67573 30.5915 5.08602 29.4194 3.91391C28.2473 2.74181 26.6576 2.08333 25 2.08333V2.08333Z'
          stroke='#EEEEEE'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M39.5834 20.8333V25C39.5834 28.8677 38.047 32.5771 35.3121 35.312C32.5771 38.0469 28.8678 39.5833 25.0001 39.5833C21.1323 39.5833 17.423 38.0469 14.6881 35.312C11.9532 32.5771 10.4167 28.8677 10.4167 25V20.8333'
          stroke='#EEEEEE'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M25 39.5833V47.9167'
          stroke='#EEEEEE'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M16.6667 47.9167H33.3334'
          stroke='#EEEEEE'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_451_917'
          x='-4'
          y='0'
          width='58'
          height='58'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='4' />
          <feGaussianBlur stdDeviation='2' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_451_917' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_451_917'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
}

export default Mic;
