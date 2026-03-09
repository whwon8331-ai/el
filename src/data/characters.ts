export interface Character {
  id: number;
  title: string;
  name: string;
  tags: string[];
  dialogue: string;
  description: string;
  hiddenVoice: string;
  imageUrl: string;
  age: string;
  height: string;
}

export const characters: Character[] = [
  {
    id: 1,
    title: "제국 황태자",
    name: "카시우스 (Cassius)",
    tags: ["#오만", "#시한부", "#강압", "#증명"],
    dialogue: "오늘 밤도 날 살려놔.",
    description: "제국의 태양이지만, 속은 타들어가고 있습니다. 그의 오만함은 살고 싶다는 비명일 뿐입니다. 당신이 없으면 그는 죽습니다.",
    hiddenVoice: "\"제발... 가지 마. 나한텐 너밖에 없어.\"",
    imageUrl: "https://i.postimg.cc/7ZZnKjxZ/hwangtaeja.webp",
    age: "26세",
    height: "189cm",
  },
  {
    id: 2,
    title: "마탑주",
    name: "아르델 (Ardel)",
    tags: ["#광기", "#매드사이언티스트", "#실험", "#탐구"],
    dialogue: "비명 지르지 마세요. 데이터에 방해됩니다.",
    description: "그에게 당신은 인간이 아닌, '걸어 다니는 성유물'입니다. 학구열이라는 이름의 광기가 당신을 해부하려 합니다.",
    hiddenVoice: "\"아름다워... 해부해서 박제하고 싶군요.\"",
    imageUrl: "https://i.postimg.cc/k5rD2tYs/matabju.webp",
    age: "??",
    height: "179cm",
  },
  {
    id: 3,
    title: "북부 대공",
    name: "칼리온 (Calion)",
    tags: ["#야성", "#짐승", "#속죄", "#복종"],
    dialogue: "제발... 나를 진정시켜 줘.",
    description: "이성을 잃은 맹수에게 유일한 주인은 당신뿐입니다. 그는 당신의 발치에 엎드려 구원을 구걸합니다.",
    hiddenVoice: "\"미안하다. 또 발작이... 윽, 제발. 약을 다오...\"",
    imageUrl: "https://i.postimg.cc/W15XjT98/bugbudaegong.webp",
    age: "34세",
    height: "192cm",
  },
  {
    id: 4,
    title: "성기사단장",
    name: "미카엘 (Michael)",
    tags: ["#신성", "#타락", "#위선", "#배덕"],
    dialogue: "이것은 기도가 아닙니다. 구원입니다.",
    description: "가장 성스러운 척하지만, 가장 타락했습니다. 신의 이름을 빌려 당신을 탐하는 위선자입니다.",
    hiddenVoice: "\"오, 신이시여... 더럽혀지고 싶습니다. 더 깊이...\"",
    imageUrl: "https://i.postimg.cc/13F313Rr/seong-gisa.webp",
    age: "26세",
    height: "188cm",
  },
  {
    id: 5,
    title: "암살 길드장",
    name: "레이븐 (Raven)",
    tags: ["#퇴폐", "#중독", "#쾌락", "#생존"],
    dialogue: "아, 떨려... 조금만 줘. 시키는 거 다 할게.",
    description: "고통을 잊게 해주는 당신에게 철저히 중독되었습니다. 그는 쾌락을 위해서라면 무엇이든 할 것입니다.",
    hiddenVoice: "\"크큭, 바보 같은 주인님. 약 기운만 돌면 덮칠 건데...\"",
    imageUrl: "https://i.postimg.cc/6qTBj91n/amsalja.webp",
    age: "22세",
    height: "186cm",
  },
  {
    id: 6,
    title: "드래곤 로드",
    name: "테르시온 (Tersion)",
    tags: ["#오만", "#소유욕", "#인외", "#수집"],
    dialogue: "영원히 내 것으로 만들어주지.",
    description: "모든 것을 가진 고룡이 유일하게 가지지 못한 것. 그는 당신을 수집하여 영원히 가두려 합니다.",
    hiddenVoice: "\"도망쳐 보거라. 그래봤자 내 손바닥 안이다.\"",
    imageUrl: "https://i.postimg.cc/cCJLp76h/deulaegon.webp",
    age: "5,000세 이상",
    height: "215cm",
  },
  {
    id: 7,
    title: "저주받은 용사",
    name: "카일 (Kyle)",
    tags: ["#배신", "#복수", "#헌신", "#집착"],
    dialogue: "나를... 버리지 마십시오.",
    description: "세상에 버림받은 영웅의 마지막 안식처. 당신을 위해서라면 그는 다시 지옥으로 걸어 들어갈 것입니다.",
    hiddenVoice: "\"당신마저 날 버리면... 그땐 내 손으로 당신 다리를 부러뜨려서라도 곁에 둘 겁니다.\"",
    imageUrl: "https://i.postimg.cc/QNn8BTFr/yeong-ung.webp",
    age: "25세",
    height: "184cm",
  },
  {
    id: 8,
    title: "사역마",
    name: "포치 (Pochi)",
    tags: ["#조력자", "#충견", "#집착", "#하극상"],
    dialogue: "히히, 주인님! 오늘도 돈 많이 벌어왔어? 나 칭찬해 줘!",
    description: "낯선 이세계에서 당신의 눈과 귀가 되어주는 유일한 내 편입니다. 상점의 모든 잡무를 처리하며 꼬리를 흔들지만, 방심하지 마십시오. 충직한 개도 배가 고프면 주인의 가장 부드러운 살점을 탐하는 법입니다.",
    hiddenVoice: "\"다른 새끼 냄새 묻히지 마... 넌 내 거야. 내 주인님이잖아. 나만 예뻐해 줘, 제발...\"",
    imageUrl: "https://i.postimg.cc/MHFxbRWN/pochi.webp",
    age: "??",
    height: "181cm",
  },
];
