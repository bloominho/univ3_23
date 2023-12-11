import React, { useState } from 'react';

function App() {
  // 등록 차수 확인
  let today = new Date();
  let month = today.getMonth()+1;
  let date = today.getDate();

  let jcMoney = 49000; // 전참 등록 비용
  let n = 1; //등록 차수
  if(month == 12 && date >= 18){
    n = 2; // 12월 2차
    jcMoney = 55000;
  } else if(month == 1 && date <= 7){
    n = 2; // 1월 2차
    jcMoney = 55000;
  } else if(month == 1 && date >= 10){
    n = 3; // 1월 3차
    jcMoney = 59000;
  } else if(month == 1 && date >= 8 && date <= 9){
    n = 4; // 2차와 3차 사이
  }

  // 전참 여부 확인용 State Variable
  const [jcTrue, setJcTrue] = useState(true);

  // 등록비 계산 사유 확인
  let reasons = "";


  // 식사/숙박 확인용 State Variable
  let templist = new Array(13);
  for(let i=0; i<13; i++){
    templist[i] = false;
  }

  const [ESlist, setESlist] = useState(templist);
  let ESmanage = (i) => { templist = ESlist.slice(); templist[i] = !templist[i]; setESlist(templist)}

  // 새돌/현역군지체/EBS 확인용 State Variable
  const [special, setSpecial] = useState(false);
  if(special){
    // 전참 등록비가 항상 1차 등록비
    jcMoney = 49000;
    reasons += "새돌, 현역군지체, 수양회에서 EBS로 등록하는 지체들에게는 항상 1차 등록비가 전참등록비로 적용됩니다. "
  }


  // 최종 등록 비용 계산
  let finalMoney = 0; // 최종 등록 금액
  let a = 0; // 끼니/숙박 개수
  if(!jcTrue){
    // 부분참인 경우
    for(let i=0; i<13; i++){
      // 끼니당 11000원
      if(ESlist[i]){
        finalMoney += 11000;
        a += 1;
      }
    }
    reasons += ("부분참의 경우, 끼니/숙박당 11,000원이 적용됩니다 (11,000원 X "+a+" = "+finalMoney+"원). ");

    if(ESlist[1] && ESlist[2]){
      // 1일차 저녁 & 숙박 중복
      finalMoney -=11000;
      reasons += "1일차에 저녁과 숙박을 합쳐서 11,000원이 적용됩니다 (-11,000원). "
    }
    if(ESlist[5] && ESlist[6]){
      // 2일차 저녁 & 숙박 중복
      finalMoney -=11000;
      reasons += "2일차에 저녁과 숙박을 합쳐서 11,000원이 적용됩니다 (-11,000원). "
    }
    if(ESlist[9] && ESlist[10]){
      // 3일차 저녁 & 숙박 중복
      finalMoney -=11000;
      reasons += "3일차에 저녁과 숙박을 합쳐서 11,000원이 적용됩니다 (-11,000원). "
    }

    // 전참 등록비를 초과할 수 없음
    if(finalMoney > jcMoney){
      reasons += ("이때, 부분참등록비("+finalMoney+"원)가 전참등록비("+jcMoney+"원)를 초과할 경우, 전참등록비 "+jcMoney+"원이 최종금액입니다. ")
    }
    finalMoney = (finalMoney > jcMoney) ? jcMoney : finalMoney;
  } else {
    // 전참인 경우
    finalMoney = jcMoney;
    reasons += "전참등록비("+jcMoney+")입니다. "
  }




  // 부분참일 경우 추가 확인 사항 (식사, 숙박 확인)
  let extraInfo = "";
  if (!jcTrue) {
    extraInfo = <>
      <div className="GMS-Bold mb-5">
        <h4 className="GMS-Bold mb-1">식사와 숙박을</h4>
        <h4 className="GMS-Bold mb-3">모두 체크해주세요 !</h4>

        <div className="mb-3">
          <h5 className="GMS-Bold">1일차 (1월 10일, 수)</h5>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="ESCheck" id="checkAB" checked={ESlist[0]} onClick={() => {ESmanage(0)}}/>
            <label class="form-check-label" for="checkAB">
              점심식사
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="ESCheck" id="checkAC" checked={ESlist[1]} onClick={() => {ESmanage(1)}}/>
            <label class="form-check-label" for="checkAC">
              저녁식사
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="ESCheck" id="checkAD" checked={ESlist[2]} onClick={() => {ESmanage(2)}}/>
            <label class="form-check-label" for="checkAD">
              숙박
            </label>
          </div>
        </div>
        <div className="mb-3">
          <h5 className="GMS-Bold">2일차 (1월 11일, 목)</h5>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="ESCheck" id="checkBA" checked={ESlist[3]} onClick={() => {ESmanage(3)}}/>
            <label class="form-check-label" for="checkBA">
              아침식사
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="ESCheck" id="checkBB" checked={ESlist[4]} onClick={() => {ESmanage(4)}}/>
            <label class="form-check-label" for="checkBB">
              점심식사
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="ESCheck" id="checkBC" checked={ESlist[5]} onClick={() => {ESmanage(5)}}/>
            <label class="form-check-label" for="checkBC">
              저녁식사
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="ESCheck" id="checkBD" checked={ESlist[6]} onClick={() => {ESmanage(6)}}/>
            <label class="form-check-label" for="checkBD">
              숙박
            </label>
          </div>
        </div>
        <div className="mb-3">
          <h5 className="GMS-Bold">3일차 (1월 12일, 금)</h5>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="ESCheck" id="checkCA" checked={ESlist[7]} onClick={() => {ESmanage(7)}}/>
            <label class="form-check-label" for="checkCA">
              아침식사
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="ESCheck" id="checkCB" checked={ESlist[8]} onClick={() => {ESmanage(8)}}/>
            <label class="form-check-label" for="checkCB">
              점심식사
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="ESCheck" id="checkCC" checked={ESlist[9]} onClick={() => {ESmanage(9)}}/>
            <label class="form-check-label" for="checkCC">
              저녁식사
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="ESCheck" id="checkCD" checked={ESlist[10]} onClick={() => {ESmanage(10)}}/>
            <label class="form-check-label" for="checkCD">
              숙박
            </label>
          </div>
        </div>
        <div className="mb-3">
          <h5 className="GMS-Bold">4일차 (1월 13일, 토)</h5>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="ESCheck" id="checkDA" checked={ESlist[11]} onClick={() => {ESmanage(11)}}/>
            <label class="form-check-label" for="checkDA">
              아침식사
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="ESCheck" id="checkDB" checked={ESlist[12]} onClick={() => {ESmanage(12)}}/>
            <label class="form-check-label" for="checkDB">
              점심식사
            </label>
          </div>
        </div>
      </div>
    </>
  }

  return (
    <body className="position-relative">
      <div id="bodyCard" className="m-auto">
        <div className="mb-5">
          <div className="mb-2">
            <h1 id="Title" className="GMS-Bold title-text mb-0 themeColor">2024</h1>
            <h1 id="Title" className="GMS-Bold title-text mb-0 themeColor">대학3·4·8부</h1>
            <h1 id="Title" className="GMS-Bold title-text mb-0 themeColor">겨울연합수양회</h1>
          </div>
          <div className="mb-3">
            <img id="logo" src="./img/logo_fixed_2.png" className="rounded d-block" alt="..." width="250" />
          </div>
        </div>
        <div className="mb-5">
          <h4 className="GMS-Bold">{n}차 등록 기간</h4>
          <h5 className="GMS-Norm"><span className="GMS-Bold">전참 등록</span> | {jcMoney}원</h5>
          <h5 className="GMS-Norm"><span className="GMS-Bold">부분참 등록</span> | (끼니당) 11,000원</h5>
          <p className="GMS-Bold ex-explanation mb-0">부분참 등록비가 전참 등록비를 초과할 경우 전참 등록비가 적용됩니다.</p>
          <p className="GMS-Bold ex-explanation mb-0">2024년 새돌, EBS, 현역 군지체는 등록기간 상관 없이 1차 등록비</p>
          <p className="GMS-Bold ex-explanation mb-0">버스티켓 별도 구매 (편도 8,000원, 왕복 16,000원)</p>
          <p className="GMS-Bold ex-explanation mb-0">*버스 티켓은 12월 17일 (주일) 부터 판매</p>
        </div>
        <div className="GMS-Bold mb-5">
          <h4 className="GMS-Bold">전참이신가요 ?</h4>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="JCRadio" id="jcRadioYes" checked={jcTrue} onClick={() => {setJcTrue(true)}} />
            <label class="form-check-label" for="jcRadioYes">
              전참입니다.
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="JCRadio" id="jcRadioNo"  checked={!jcTrue} onClick={() => {setJcTrue(false)}}/>
            <label class="form-check-label" for="jcRadioNo">
              부분참입니다.
            </label>
          </div>
        </div>

        {extraInfo}

        <div className="GMS-Bold mb-5">
          <h4 className="GMS-Bold mb-1">마지막</h4>
          <h4 className="GMS-Bold mb-3">확인사항 !</h4>
          <div className="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" name="Special Check" id="checkSpecial" checked={special} onClick={() => {setSpecial(!special)}}/>
              <label class="form-check-label" for="checkSpecial">
                수양회 EBS, 새돌, 현역 군지체이신가요 ?
                <div className="ex-explanation">부서 내 EBS 가 아닌, <ins>수양회에서 EBS로 등록</ins>하는 경우에 해당합니다.</div>
                <div className="ex-explanation"><ins>2024년</ins> 새돌에게 해당됩니다.</div>
              </label>
            </div>
          </div>
        </div>

        <div className="GMS-Bold mb-5">
          <h3 className="GMS-Bold mb-2">등록비는 {finalMoney}원입니다.</h3>
          <p className="ex-explanation mb-2">*등록비 계산: {reasons}</p>
        </div>

        <hr/>

        <div className="GMS-Bold mb-5">
          <h3 className="GMS-Bold mb-3">등록 방법 안내</h3>
          <div className="mb-4">
            <h4 className="GMS-Bold mb-1">1단계 : 신청서 작성</h4>
            <h5 className="GMS-Norm"><button type="button" class="btn btn-outline-primary border-0 GMS-Bold" onClick={() => {window.open("https://forms.gle/AWCteTyMEPhAMwfB7");}}><ins>여기서</ins></button> 신청서를 작성해주세요.</h5>
          </div>

          <div className="mb-3">
            <h4 className="GMS-Bold mb-2">2단계 : 등록비 입금</h4>
            <h5 className="GMS-Norm mb-1">등록비 <ins className="GMS-Bold">{finalMoney}원</ins>을</h5>
            <h5 className="GMS-Bold mb-1">카카오뱅크 79798602808 (박희서)</h5>
            <h5 className="GMS-Norm mb-2">으로 입금해주세요.</h5>
          </div>
        </div>

        <div>
          <h4 className="GMS-Bold mb-1">꼭 확인해주세요 !</h4>
          <ul className="p-3">
            <li className="GMS-Norm mb-1">등록비는 입금 날짜를 기준으로 받습니다. 신청 후 바로 입금해주세요.</li>
            <li className="GMS-Norm mb-1">환불은 불가합니다.</li>
            <li className="GMS-Norm mb-1">입금 문자를 받으셔야 등록이 완료됩니다.</li>
            <li className="GMS-Norm mb-1">입금자 명을 '본인이름+학년' 으로 변경해서 보내주세요. (예: 배은택9학년)</li>
            <li className="GMS-Norm mb-1">[교회 ↔ 안성수양관] 버스티켓은 별도입니다.</li>
          </ul>
        </div>

        <div className="mb-5">
          <h4 className="GMS-Bold mb-2">문의</h4>
          <h5 className="GMS-Bold mb-1">행정간사 박희서 </h5>
          <h5 className="GMS-Norm mb-2">(010-5478-1099)</h5>
          <h5 className="GMS-Bold mb-1">입금확인: 하울 행정팀 이준범 </h5>
          <h5 className="GMS-Norm mb-1">(010-3401-0087)</h5>

          <h5 className="GMS-Norm mb-1"></h5>
        </div>


        <div>
          <h4 className="GMS-Light mb-3">[합3:18] 나는 여호와로 말미암아 즐거워하며 나의 구원의 하나님으로 말미암아 기뻐하리로다</h4>
        </div>
        <img id="logo" src="./img/logo_fixed_2.png" className="rounded d-block m-auto p-0" alt="..." width="100" />

      </div>
    </body>
  );
}

export default App;
