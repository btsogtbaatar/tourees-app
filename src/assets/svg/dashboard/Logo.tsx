import React from 'react';
import {
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Svg,
} from 'react-native-svg';

const Logo = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="85"
      height="24"
      viewBox="0 0 85 24"
      fill="none">
      <G clip-path="url(#clip0_8047_1041)" fill='white'>
        <Path
          d="M37.3159 19.5004C35.7909 19.5004 34.5209 19.4204 33.4959 19.2554C32.4709 19.0904 31.7709 18.9254 31.3959 18.7654V18.2004L30.8809 15.9904C31.3059 16.3204 32.0709 16.6604 33.1759 17.0104C34.2809 17.3604 35.6309 17.5404 37.2159 17.5404C38.0509 17.5404 38.6909 17.4854 39.1309 17.3704C39.5709 17.2554 39.8709 17.0904 40.0259 16.8804C40.1809 16.6654 40.2609 16.4304 40.2609 16.1704C40.2609 15.8404 40.1459 15.5854 39.9159 15.3954C39.6859 15.2054 39.2709 15.0504 38.6609 14.9304C38.0559 14.8054 37.1609 14.6804 35.9809 14.5504C34.6559 14.3854 33.6159 14.1504 32.8709 13.8354C32.1259 13.5254 31.6109 13.1254 31.3209 12.6454C31.0359 12.1604 30.8909 11.5754 30.8909 10.8904C30.8909 10.3354 31.0359 9.79539 31.3309 9.28039C31.6259 8.76539 32.1559 8.34539 32.9259 8.01539C33.6959 7.69039 34.7859 7.52539 36.1959 7.52539C37.6059 7.52539 38.9209 7.60539 39.9559 7.77039C40.9859 7.93539 41.7009 8.10039 42.0959 8.26039V8.82539L42.5859 10.7904C42.1909 10.5104 41.4509 10.2254 40.3609 9.93039C39.2709 9.63539 37.9409 9.49039 36.3659 9.49039C35.3359 9.49039 34.6359 9.60539 34.2659 9.83539C33.8959 10.0654 33.7109 10.3754 33.7109 10.7704C33.7109 10.9854 33.7609 11.1704 33.8559 11.3354C33.9559 11.5004 34.1459 11.6454 34.4309 11.7754C34.7159 11.9054 35.1459 12.0254 35.7209 12.1304C36.2959 12.2354 37.0659 12.3454 38.0309 12.4604C39.4209 12.6054 40.4759 12.8404 41.1859 13.1604C41.9009 13.4804 42.3859 13.8754 42.6459 14.3404C42.9059 14.8054 43.0409 15.3504 43.0409 15.9754C43.0409 16.7104 42.8459 17.3454 42.4659 17.8654C42.0809 18.3904 41.4609 18.7954 40.6109 19.0804C39.7609 19.3654 38.6559 19.5104 37.2959 19.5104L37.3159 19.5004Z"
          fill="#21272D"
        />
        <Path
          d="M51.1023 19.4998C49.8073 19.4998 48.7373 19.3548 47.8973 19.0598C47.0523 18.7648 46.3873 18.3498 45.8973 17.8198C45.4073 17.2898 45.0623 16.6598 44.8673 15.9398C44.6723 15.2198 44.5723 14.4148 44.5723 13.5298C44.5723 11.6798 45.0973 10.2148 46.1423 9.12977C47.1923 8.04977 48.7623 7.50977 50.8573 7.50977C52.0873 7.50977 53.0773 7.67977 53.8323 8.01477C54.5873 8.34977 55.1573 8.79477 55.5523 9.33977C55.9473 9.88977 56.2173 10.4898 56.3623 11.1448C56.5073 11.7998 56.5823 12.4448 56.5823 13.0848V14.2398C56.5823 14.1898 56.3573 14.1398 55.9073 14.0798C55.4573 14.0248 54.6973 13.9948 53.6323 13.9948H47.4173C47.4173 15.0898 47.7473 15.9498 48.4123 16.5748C49.0773 17.1998 50.0973 17.5098 51.4723 17.5098C52.6373 17.5098 53.6173 17.3648 54.4223 17.0798C55.2223 16.7948 55.7823 16.5098 56.0923 16.2298V16.8198L56.3373 18.5148C55.9923 18.7298 55.3723 18.9448 54.4723 19.1648C53.5723 19.3848 52.4473 19.4948 51.1073 19.4948L51.1023 19.4998ZM48.3773 12.2048H53.7823C53.7823 11.7948 53.6973 11.3798 53.5223 10.9648C53.3473 10.5498 53.0573 10.1948 52.6373 9.90977C52.2173 9.62477 51.6273 9.47976 50.8573 9.47976C50.1873 9.47976 49.6173 9.58977 49.1473 9.80977C48.6773 10.0298 48.3223 10.3098 48.0673 10.6448C47.8123 10.9798 47.6873 11.3348 47.6873 11.7148C47.6873 11.8798 47.7373 11.9998 47.8323 12.0848C47.9323 12.1648 48.1123 12.2098 48.3723 12.2098L48.3773 12.2048Z"
          fill="#21272D"
        />
        <Path
          d="M64.6159 19.4998C63.3209 19.4998 62.2509 19.3548 61.4109 19.0598C60.5659 18.7648 59.9009 18.3498 59.4109 17.8198C58.9209 17.2898 58.5759 16.6598 58.3809 15.9398C58.1859 15.2198 58.0859 14.4148 58.0859 13.5298C58.0859 11.6798 58.6109 10.2148 59.6559 9.12977C60.7059 8.04977 62.2759 7.50977 64.3709 7.50977C65.6009 7.50977 66.5909 7.67977 67.3459 8.01477C68.1009 8.34977 68.6709 8.79477 69.0659 9.33977C69.4609 9.88977 69.7309 10.4898 69.8759 11.1448C70.0209 11.7998 70.0959 12.4448 70.0959 13.0848V14.2398C70.0959 14.1898 69.8709 14.1398 69.4209 14.0798C68.9709 14.0248 68.2109 13.9948 67.1459 13.9948H60.9309C60.9309 15.0898 61.2609 15.9498 61.9259 16.5748C62.5909 17.1998 63.6109 17.5098 64.9859 17.5098C66.1509 17.5098 67.1309 17.3648 67.9359 17.0798C68.7359 16.7948 69.2959 16.5098 69.6059 16.2298V16.8198L69.8509 18.5148C69.5059 18.7298 68.8859 18.9448 67.9859 19.1648C67.0859 19.3848 65.9609 19.4948 64.6209 19.4948L64.6159 19.4998ZM61.8909 12.2048H67.2959C67.2959 11.7948 67.2109 11.3798 67.0359 10.9648C66.8609 10.5498 66.5709 10.1948 66.1509 9.90977C65.7309 9.62477 65.1409 9.47976 64.3709 9.47976C63.7009 9.47976 63.1309 9.58977 62.6609 9.80977C62.1909 10.0298 61.8359 10.3098 61.5809 10.6448C61.3259 10.9798 61.2009 11.3348 61.2009 11.7148C61.2009 11.8798 61.2509 11.9998 61.3459 12.0848C61.4459 12.1648 61.6259 12.2098 61.8859 12.2098L61.8909 12.2048Z"
          fill="#21272D"
        />
        <Path
          d="M77.4457 19.4991C75.9207 19.4991 74.7357 19.2391 73.8807 18.7141C73.0307 18.1891 72.4357 17.4791 72.1007 16.5741C71.7657 15.6741 71.5957 14.6591 71.5957 13.5291C71.5957 12.3991 71.7657 11.3591 72.1007 10.4591C72.4357 9.55914 73.0307 8.84414 73.8807 8.30914C74.7307 7.77914 75.9207 7.50914 77.4457 7.50914C78.0507 7.50914 78.5907 7.56414 79.0557 7.66914C79.5207 7.77414 79.9357 7.92414 80.2957 8.10914C80.6557 8.29914 80.9607 8.51414 81.2057 8.75914L81.2557 8.73414L81.2057 8.26914V5.96914C81.2057 5.44414 81.1507 5.07414 81.0457 4.84914C80.9407 4.62914 80.8307 4.50914 80.7157 4.49414H84.0307V17.7741C84.0307 18.2991 84.0857 18.6741 84.1907 18.9041C84.2957 19.1341 84.4057 19.2491 84.5207 19.2491H81.2057V18.6341L81.2807 18.1691L81.2057 18.1441C80.9607 18.4041 80.6557 18.6391 80.2957 18.8441C79.9357 19.0491 79.5157 19.2091 79.0407 19.3241C78.5657 19.4391 78.0357 19.4941 77.4457 19.4941V19.4991ZM77.6907 17.5091C78.4257 17.5091 79.0307 17.3991 79.4957 17.1791C79.9607 16.9591 80.3207 16.6541 80.5657 16.2691C80.8107 15.8841 80.9807 15.4591 81.0707 14.9891C81.1607 14.5241 81.2057 14.0341 81.2057 13.5291C81.2057 13.0691 81.1557 12.6041 81.0607 12.1291C80.9607 11.6541 80.7907 11.2141 80.5457 10.8141C80.3007 10.4141 79.9457 10.0891 79.4907 9.84414C79.0307 9.59914 78.4357 9.47414 77.6957 9.47414C76.5157 9.47414 75.6757 9.82414 75.1757 10.5291C74.6757 11.2341 74.4257 12.2391 74.4257 13.5491C74.4257 14.4191 74.5257 15.1441 74.7307 15.7341C74.9357 16.3241 75.2807 16.7641 75.7607 17.0591C76.2457 17.3541 76.8857 17.4991 77.6907 17.4991V17.5091Z"
          fill="#21272D"
        />
        <Path
          d="M5.49386 12.0778C7.13486 12.2458 11.6889 12.3088 9.49286 16.7548C7.66886 20.4508 9.71786 23.9998 13.3359 23.9998C16.9539 23.9998 19.6329 20.7328 17.6169 17.2108C16.0269 14.4328 16.7169 11.9668 19.6869 11.7898C24.4719 11.5048 25.8519 7.76679 24.2229 5.23179C22.7019 2.86479 19.8099 2.45679 16.9659 5.31579C14.9829 7.30779 12.7809 6.38079 10.3119 2.26179C8.47886 -0.798212 3.76886 -0.615212 1.57886 1.97979C-1.80514 5.99079 0.597861 11.5768 5.49386 12.0778Z"
          fill="url(#paint0_linear_8047_1041)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_8047_1041"
          x1="0"
          y1="0"
          x2="24.8766"
          y2="23.9998"
          gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stop-color="#FF9646" />
          <Stop offset="100%" stop-color="#FA6432" />
        </LinearGradient>
        <ClipPath id="clip0_8047_1041">
          <Rect width="84.8781" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Logo;
