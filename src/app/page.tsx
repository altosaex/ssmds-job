// src/app/page.tsx
"use client";

import React from 'react';
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Video, VideoOff, Clock } from "lucide-react"
import Image from "next/image";

type Post = {
  id: number
  status: "現職" | "前職"
  job: string
  industry: string
  yearsOfExperience: number
  nickname: string
  age: string
  gender: string
  comment: string
	imageUrl?: string
	sessionVideo: "ON" | "OFF" | "都度相談"
	preferredSessionTime: string
}

const dummyPosts: Post[] = [
  { id: 1, status: "現職", job: "プロコーチ／キャリアコンサルタント", industry: "コーチング", yearsOfExperience: 5, nickname: "望月 彩恵", age: "39歳", gender: "女性", comment: "コーチとして独立して5年。コーチングスクール講師業や企業研修支援など、法人／個人問わず、日々色々な方の目標達成支援を行っております。", imageUrl: "/images/MochizukiSae.png", sessionVideo: "ON", preferredSessionTime: "都度相談" },
  { id: 2, status: "現職", job: "広告、制作ディレクター", industry: "広告、制作、採用", yearsOfExperience: 7, nickname: "高橋 駿", age: "33歳", gender: "男性", comment: "広告代理店のベンチャー企業で執行役員をしています。最近では採用業界のコンテンツ作り、採用支援を行っております。", imageUrl: "/images/TakahashiShun.jpg", sessionVideo: "ON" , preferredSessionTime: "都度相談" },
  { id: 3, status: "現職", job: "クライアントゲームプログラマー", industry: "ゲーム", yearsOfExperience: 13, nickname: "三原 広貴", age: "33歳", gender: "男性", comment: "Unityを使ったゲーム制作を13年ほど行っております。どのセクションにおいても設計をこなせ、即座にゲームを完成させることが得意です。", imageUrl: "/images/MiharaHiroki.jpeg", sessionVideo: "ON" , preferredSessionTime: "平日夜間希望" },
	{ id: 4, status: "現職", job: "スマホアプリの労務", industry: "IT", yearsOfExperience: 7, nickname: "ワタナベ", age: "36歳", gender: "女性", comment: "人材サービスのコーディネーターからゲームアプリの採用担当になり、今はアプリ会社の労務を担当してます。入退社手続き、勤怠管理、給与計算など担当してます。", imageUrl: "/images/woman.png", sessionVideo: "都度相談", preferredSessionTime: "都度相談" },
	{ id: 5, status: "現職", job: "会社員", industry: "人材", yearsOfExperience: 15, nickname: "武藤 梨恵", age: "38歳", gender: "女性", comment: "人材業界のパーソルキャリアで新卒採用および採用全体の企画/マーケ等を担当しています。", imageUrl: "/images/MutohRie.jpeg", sessionVideo: "ON" , preferredSessionTime: "都度相談" },
	{ id: 6, status: "現職", job: "製造業", industry: "自動車", yearsOfExperience: 12, nickname: "5児の父", age: "34歳", gender: "男性", comment: "スマートシティの企画運営", imageUrl: "/images/5jinochichi.jpeg", sessionVideo: "ON", preferredSessionTime: "平日夜間, 土日祝日中, 土日祝夜間" },
	{ id: 7, status: "現職", job: "会社員", industry: "コンサルティング", yearsOfExperience: 7, nickname: "ごう", age: "29歳", gender: "男性", comment: "大学卒業後、新卒でベイカレントコンサルティングに就職して、7年現職。仕事内容はPM、PMOなどプロジェクト管理。", imageUrl: "/images/KudohGo.jpeg", sessionVideo: "ON" , preferredSessionTime: "土日祝希望" },
	{ id: 8, status: "現職", job: "金融系ベンチャーキャピタル", industry: "金融", yearsOfExperience: 14, nickname: "ひろ", age: "37歳", gender: "男性", comment: "金融系VCでベンチャー投資をしています。過去に金融機関で法人営業を10年、その後、金融系VCで4年ベンチャー投資と経営企画を行っています。", imageUrl: "/images/man.png", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 9, status: "現職", job: "HR系スタートアップのPM", industry: "人材", yearsOfExperience: 1, nickname: "てんのう", age: "31歳", gender: "女性", comment: "企業の退職者に特化したコミュニティを運営しており、元々の企業と退職者のビジネス協業や、再入社、退職者同士の協業を目的にアプリ開発やコンサル、イベント運営などしております！ちなみに前職は自動車メーカーで設計エンジニアをしていました。3D CADでモデリングとかしてました", imageUrl: "/images/AoyamaSaki.jpeg", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 10, status: "現職", job: "貿易(通関)→貿易系IT", industry: "貿易、SaaSスタートアップ", yearsOfExperience: 7, nickname: "Lisa", age: "30歳", gender: "女性", comment: "新卒で通関のお仕事をしたのち、業界全体の非効率を改善したいと思い貿易書類の完全電子化SaaSを開発する会社に転職しました！今は育休中です。", imageUrl: "/images/woman.png", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 11, status: "現職", job: "プロジェクトマネージャー", industry: "IT", yearsOfExperience: 1, nickname: "いっけい", age: "30歳", gender: "男性", comment: "アクティビティが趣味で、仕事にも遊びにも常に全力で取り組んでます！仕事は前職がハードウェアエンジニアで、現職はITのプロジェクトマネージャーです。ITに関しては未経験の状態からオフショア開発でネパール人エンジニアをマネジメントして、ウェブシステムやモバイルアプリの開発に携わっています。", imageUrl: "/images/WatanabeIkkei.jpeg", sessionVideo: "ON", preferredSessionTime: "平日夜間, 土日祝希望" },
	{ id: 12, status: "現職", job: "人事", industry: "IT", yearsOfExperience: 5, nickname: "ますだ", age: "30代", gender: "男性", comment: "現在はITスタートアップで人事をしています。採用や組織開発、人事評価制度の設計など人事領域幅広く経験してきました。", imageUrl: "/images/man.png", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 13, status: "現職", job: "webデザイナー", industry: "web広告、マーケティング", yearsOfExperience: 2, nickname: "えみ", age: "40代", gender: "女性", comment: "化粧品の広告を制作しています。", imageUrl: "/images/woman.png", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 14, status: "前職", job: "設計エンジニア", industry: "自動車メーカー", yearsOfExperience: 5, nickname: "てんのう", age: "31歳", gender: "女性", comment: "自動車メーカーで設計エンジニアをしていました。内装やエンジン周りの部品を、CATIAやNXで3Dモデリングしたり、図面を書いていました。", imageUrl: "/images/AoyamaSaki2.jpeg", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 15, status: "現職", job: "SE", industry: "医療系IT", yearsOfExperience: 3, nickname: "永松", age: "28歳", gender: "男性", comment: "九州出身で就職を機に上京、1社目。顧客は主に病院でアプリケーション導入、納品、カスタマイズ等を担当。設計からプログラミングを浅く広く実施しています。人事に異動を計画中", imageUrl: "/images/man.png", sessionVideo: "都度相談", preferredSessionTime: "土日祝日中" },
	{ id: 16, status: "現職", job: "CAEエンジニア", industry: "製造業", yearsOfExperience: 8, nickname: "だいちゃん", age: "36歳", gender: "男性", comment: "自動車メーカーを中心にCAE解析関連の様々な現場の困りごと解決のお手伝いをさせていただいてます。チームリーダーとしてシミュレーション用のモデル構築からツール開発まで、様々な業務に関わっています。", imageUrl: "/images/DaisukeSatoh.jpg", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 17, status: "現職", job: "事業会社Bizdev", industry: "金融•決済", yearsOfExperience: 14, nickname: "ゆーすけ", age: "30代", gender: "男性", comment: "事業開発をしてます。プロダクト開発、マーケティング、事業計画、アライアンスなど事業に関わることは広くやってきました。最近は、金融分野のプロダクト企画や中期計画、マーケティングをマネジャーの立場でチームを率いてます。中途採用しながら、チーム拡大中です", imageUrl: "/images/man.png", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 18, status: "現職", job: "会社代表", industry: "ハードウェア", yearsOfExperience: 1, nickname: "ふみ", age: "50代", gender: "女性", comment: "30年の外資系会社員人生を経て、これからはライフワークだけで生きていこうと、新しい分野で会社立ち上げ中。今は小さいロボットの企画開発をしています。", imageUrl: "/images/ToyodaFumiko.jpeg", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 19, status: "現職", job: "ITコンサル（めっちゃ小さい会社）", industry: "ITコンサル", yearsOfExperience: 5, nickname: "しゅっくん", age: "38歳", gender: "非公開", comment: "自己紹介：\n・大学院博士課程で宇宙を研究（研究でセカイを変えたく）\n・ITエンジニア（ITでセカイを変えたくまずは作る）\n・ITコンサル（ITでセカイを変えたく上流へ）\n・起業準備中（事業でセカイを変えたく画策中）\n現職紹介（私のケース）：\n・クライアント先（某大企業）に常駐し、社内向けの全社システム（購買系システムなど）の企画、計画、設計、推進を行っている\n・スポットで別クライアントの短期間の案件（システム化計画等）を担当したりもしている", imageUrl: "/images/ShukuyaDaishi.jpg", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 20, status: "現職", job: "セールスエンジニア", industry: "建設業の経営支援", yearsOfExperience: 1, nickname: "今井 秀哉", age: "27歳", gender: "男性", comment: "建設業を対象に経営支援事業とsaas事業をしています。\n経営支援事業は、採用・DX支援をしています。\nsaas事業は、デザインと開発をしています。\n以下経歴です。\n・ファーストリテーリング（アパレル）で2年店員\n・シェルフィー（建設IT）で2年営業", imageUrl: "/images/man.png", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 21, status: "現職", job: "マーケティング", industry: "就転職支援系業界", yearsOfExperience: 3, nickname: "稲川", age: "30代", gender: "男性", comment: "求人広告・採用サイト・就活記事サイトなどの企業を転々としてきました。今の時代、キャリアポートフォリオのバランスを保つことがとても重要だと考えています。", imageUrl: "/images/InagawaRyouwa.jpg", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 22, status: "現職", job: "広告、イベントキャスティングディレクター", industry: "芸能", yearsOfExperience: 11, nickname: "たつや", age: "41歳", gender: "男性", comment: "20代は商社の営業マン。\n30歳から芸能界の仕事につきました。\n企業PR（広告、イベント、映像）のタレントブッキングを行っています。\n自分の関心のある仕事につくことで120％のちからが発揮できることを実感しています。\n一人でも多くの子供が素敵な仕事と出会えますように。", imageUrl: "/images/MochizukiTatsuya.jpg", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 23, status: "現職", job: "職業相談員", industry: "受給機関", yearsOfExperience: 4, nickname: "ヤッシー", age: "60代", gender: "男性", comment: "製造業で34年勤務\n早期退職制度にて退職\n職業相談と紹介、応募書類添削、模擬面接等\nカウンセラーとしてのスキルを活かし、相談者に寄り添い、一人ひとりの希望が叶うよう支援しています。", imageUrl: "/images/man.png", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 24, status: "前職", job: "製造業", industry: "電気機器", yearsOfExperience: 34, nickname: "ヤッシー", age: "60代", gender: "男性", comment: "組立、部品入出庫、輸出管理、生産管理システム立ち上げ、全社決算・棚卸管理、品質管理・ISO導入、内部統制導入・業務の有効性及び効率性、財務報告の信頼性、事業活動に関 わる法令等の遵守並びに資産の保全の為の手段、新製品開発　事務方、デザインレビュー、試作品から量産品制作までの進捗管理（PDCAサイクル）、内部監査対応（被監査部門）、監査部門との交渉、被監査部門からの対応項目内容確認\n平たく言うと、何でも屋でした。開発設計事務方、財務、人事、製造、輸出、品質、製造業の業務ほぼ全てに関われたので、それぞれの仕事の目的、気をつける、難しい等学ぶ事ができました。\n現職の職業紹介にいかせています。", imageUrl: "/images/man.png", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 25, status: "現職", job: "会社員", industry: "家電", yearsOfExperience: 4, nickname: "K", age: "30代", gender: "女性", comment: "グローバル家電メーカーにて、アジア太平洋地域の市場調査責任者をしています。", imageUrl: "/images/woman.png", sessionVideo: "OFF", preferredSessionTime: "都度相談" },
	{ id: 26, status: "現職", job: "看護師", industry: "医療", yearsOfExperience: 16, nickname: "しま", age: "39歳", gender: "女性", comment: "大学病院で看護師をしています。不定期な休みで夜勤もありますが楽しく働いています。", imageUrl: "/images/shima.png", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 27, status: "前職", job: "保育士", industry: "保育", yearsOfExperience: 6, nickname: "カナエ", age: "38歳", gender: "女性", comment: "・正規職員/パート共に経験あり\n・支援センターでの在籍1年\n現在は保育職から離れていますが、仕事内容、保護者との関わりについて等お伝えできます。\nまた現役保育士の友人がたくさんいるので生の声もお伝えすることが可能です。", imageUrl: "/images/woman.png", sessionVideo: "ON", preferredSessionTime: "都度相談" },
		{ id: 28, status: "現職", job: "事業開発/マーケティング", industry: "IT/スタートアップ", yearsOfExperience: 2, nickname: "まっつー", age: "27歳", gender: "男性", comment: "■キャリア\n2020年に株式会社ZUUに入社。中小企業向けコンサルティングサービスのマーケティングを担当。経営者を対象としたセミナーの企画・集客に加え、タクシー・テレビCMキャンペーンを社長直下でプロジェクトオーナーとして推進。また同チームメンバーとインサイドセールス立ち上げや商品開発、顧客獲得モデルの企画から実行まで幅広く実施。\n2022年6月から1人目の正社員として株式会社WE UPにジョイン。営業とCS組織の立ち上げを経験し、現在は新規事業(BtoB SaaS)の事業開発を担当。\n■プライベート\nうどん、サウナ、海外旅行が好きです。", imageUrl: "/images/matsu-.jpeg", sessionVideo: "ON", preferredSessionTime: "都度相談" },
]

export default function StylishBoard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("yearsOfExperience")
  const [posts, setPosts] = useState(dummyPosts)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    filterAndSortPosts(event.target.value, sortBy)
  }

  const handleSort = (value: string) => {
    setSortBy(value)
    filterAndSortPosts(searchTerm, value)
  }

  const filterAndSortPosts = (search: string, sort: string) => {
    const filteredPosts = dummyPosts.filter(
      (post) =>
        post.job.toLowerCase().includes(search.toLowerCase()) ||
        post.industry.toLowerCase().includes(search.toLowerCase()) ||
        post.nickname.toLowerCase().includes(search.toLowerCase()) ||
        post.comment.toLowerCase().includes(search.toLowerCase())
    )

    filteredPosts.sort((a, b) => {
    if (sort === "yearsOfExperience") {
      return b.yearsOfExperience - a.yearsOfExperience;
    } else if (sort === "id") {
      // IDによる降順ソート
    return b.id - a.id;
    } else {
      return a.job.localeCompare(b.job);
    }
  });

    setPosts(filteredPosts)
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-[#E6F7FF] to-[#FFFFFF] min-h-screen font-sans relative" style={{ fontFamily: 'Nunito, sans-serif'}}>
      <div className="absolute top-4 left-4">
        <Image
					src="/images/logo.png"
          alt="スズミダス ロゴ"
          width={150}
          height={100}
          className="mr-4"
        />
      </div>
      <div className="flex items-center justify-center mb-8 mt-16">
        <h1 className="text-4xl font-bold text-[#3BB4E5] tracking-wider">職業登録者一覧</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
        <Input
          type="text"
          placeholder="検索..."
          value={searchTerm}
          onChange={handleSearch}
          className="md:w-1/2 bg-white border-2 border-[#3BB4E5] focus:border-[#3BB4E5] focus:ring-[#3BB4E5] rounded-lg shadow-sm p-3"
        />
        <Select onValueChange={handleSort}>
  <SelectTrigger className="md:w-1/4 bg-white border-2 border-[#3BB4E5] focus:border-[#3BB4E5] focus:ring-[#3BB4E5] rounded-lg p-3 text-left">
    <SelectValue placeholder="並び順" className="pl-3 pr-10" />
  </SelectTrigger>
  <SelectContent className="mt-1 border-[#3BB4E5] border-2 rounded-md shadow-lg bg-white">
			<SelectItem className="relative p-2 pl-3 pr-10 hover:bg-gray-100 flex justify-between items-center" value="id">
      新着順
			</SelectItem>
			<SelectItem className="relative p-2 pl-3 pr-10 hover:bg-gray-100 flex justify-between items-center" value="job">
      職業名順
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#3BB4E5]"></span>
			</SelectItem>
			<SelectItem className="relative p-2 pl-3 pr-10 hover:bg-gray-100 flex justify-between items-center" value="yearsOfExperience">
      勤続年数順
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#3BB4E5]"></span>
			</SelectItem>
    

		</SelectContent>
</Select>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Card key={post.id} className="flex flex-col overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#3BB4E5]">
            <CardHeader className="flex flex-col items-start gap-4 bg-gradient-to-r from-[#E6F7FF] to-[#FFFFFF] p-4">
              <div className="flex items-center justify-between w-full">
                <Badge className={`text-xs font-semibold px-2 py-1 rounded-lg shadow-md ${post.status === "現職" ? "bg-black text-white" : "bg-gray-200 text-gray-800"}`}>{post.status}
								</Badge>
                <span className="text-[#3BB4E5] font-medium text-sm">{post.industry}</span>
              </div>
              <div className="flex items-center gap-4 w-full">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#3BB4E5] shadow-md">
                  <Image
        src={post.imageUrl || "/images/placeholder.png"} // ローカル画像のパスを指定
        alt={`${post.job}のイメージ画像`}
        width={150}  // 画像の幅を指定
        height={150} // 画像の高さを指定
        className="rounded-full border-2 border-[#3BB4E5] shadow-md"
      />
    </div>
                <div className="flex-grow">
                  <CardTitle className="text-[#3BB4E5] font-semibold mb-1">{post.job}</CardTitle>
                  <p className="text-gray-600 font-medium">{post.nickname}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-4 bg-white">
              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>勤続年数: {post.yearsOfExperience}年</span>
                <span>{post.age} / {post.gender}</span>
							</div>
							<Separator className="my-2" />
              <p className="text-gray-700 mt-2 mb-4"> {post.comment.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))}</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between bg-gray-100 rounded-md p-2">
                  <span className="text-sm font-medium text-gray-700">セッション時</span>
                  <div className="flex items-center gap-2">
                    {post.sessionVideo === "ON" ? (
                      <Video className="w-4 h-4 text-[#3BB4E5]" />
                    ) : (
                      <VideoOff className="w-4 h-4 text-[#3BB4E5]" />
                    )}
                    <span className={`text-sm font-semibold ${post.sessionVideo === "ON" ? "text-[#3BB4E5]" : "text-[#3BB4E5]"}`}>
                      ビデオ{post.sessionVideo}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-gray-100 rounded-md p-2">
                  <span className="text-sm font-medium text-gray-700">セッション希望時間帯</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-[#3BB4E5]" />
                    <span className="text-sm font-semibold text-[#3BB4E5]">{post.preferredSessionTime}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end p-2 bg-[#F0FAFF]">
              <span className="text-xs text-gray-500">ID: {post.id}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}