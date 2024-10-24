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
  { id: 1, status: "現職", job: "プロコーチ", industry: "コーチング", yearsOfExperience: 5, nickname: "望月 彩恵", age: "39歳", gender: "女性", comment: "コーチとして独立して5年。コーチングスクール講師業や企業研修支援など、法人／個人問わず、日々色々な方の目標達成支援を行っております。", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/MochizukiSae.png", sessionVideo: "ON", preferredSessionTime: "都度相談" },
  { id: 2, status: "現職", job: "広告、制作ディレクター", industry: "広告、制作、採用", yearsOfExperience: 7, nickname: "高橋 駿", age: "33歳", gender: "男性", comment: "広告代理店のベンチャー企業で執行役員をしています。最近では採用業界のコンテンツ作り、採用支援を行っております。", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/TakahashiShun.jpg", sessionVideo: "ON" , preferredSessionTime: "都度相談" },
  { id: 3, status: "現職", job: "クライアントゲームプログラマー", industry: "ゲーム", yearsOfExperience: 13, nickname: "三原 広貴", age: "33歳", gender: "男性", comment: "Unityを使ったゲーム制作を13年ほど行っております。どのセクションにおいても設計をこなせ、即座にゲームを完成させることが得意です。", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/MiharaHiroki.jpeg", sessionVideo: "ON" , preferredSessionTime: "平日夜間希望" },
	{ id: 4, status: "現職", job: "スマホアプリの労務", industry: "IT", yearsOfExperience: 7, nickname: "ワタナベ", age: "36歳", gender: "女性", comment: "人材サービスのコーディネーターからゲームアプリの採用担当になり、今はアプリ会社の労務を担当してます。入退社手続き、勤怠管理、給与計算など担当してます。", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/woman.png", sessionVideo: "都度相談", preferredSessionTime: "都度相談" },
	{ id: 5, status: "現職", job: "会社員", industry: "人材", yearsOfExperience: 15, nickname: "武藤 梨恵", age: "38歳", gender: "女性", comment: "人材業界のパーソルキャリアで新卒採用および採用全体の企画/マーケ等を担当しています。", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/武藤梨恵.jpeg", sessionVideo: "ON" , preferredSessionTime: "都度相談" },
	{ id: 6, status: "現職", job: "製造業", industry: "自動車", yearsOfExperience: 12, nickname: "5児の父", age: "34歳", gender: "男性", comment: "スマートシティの企画運営", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/5児の父.jpeg", sessionVideo: "ON", preferredSessionTime: "平日夜間, 土日祝日中, 土日祝夜間" },
	{ id: 7, status: "現職", job: "会社員", industry: "コンサルティング", yearsOfExperience: 7, nickname: "ごう", age: "29歳", gender: "男性", comment: "大学卒業後、新卒でベイカレントコンサルティングに就職して、7年現職。仕事内容はPM、PMOなどプロジェクト管理。", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/KudohGo.jpeg", sessionVideo: "ON" , preferredSessionTime: "土日祝希望" },
	{ id: 8, status: "現職", job: "金融系ベンチャーキャピタル", industry: "金融", yearsOfExperience: 14, nickname: "ひろ", age: "37歳", gender: "男性", comment: "金融系VCでベンチャー投資をしています。過去に金融機関で法人営業を10年、その後、金融系VCで4年ベンチャー投資と経営企画を行っています。", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/man.png", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 9, status: "現職", job: "HR系スタートアップのPM", industry: "人材", yearsOfExperience: 1, nickname: "てんのう", age: "31歳", gender: "女性", comment: "企業の退職者に特化したコミュニティを運営しており、元々の企業と退職者のビジネス協業や、再入社、退職者同士の協業を目的にアプリ開発やコンサル、イベント運営などしております！ちなみに前職は自動車メーカーで設計エンジニアをしていました。3D CADでモデリングとかしてました", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/AoyamaSaki.jpeg", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 10, status: "現職", job: "貿易(通関)→貿易系IT", industry: "貿易、SaaSスタートアップ", yearsOfExperience: 7, nickname: "Lisa", age: "30歳", gender: "女性", comment: "新卒で通関のお仕事をしたのち、業界全体の非効率を改善したいと思い貿易書類の完全電子化SaaSを開発する会社に転職しました！今は育休中です。", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/woman.png", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 11, status: "現職", job: "プロジェクトマネージャー", industry: "IT", yearsOfExperience: 1, nickname: "いっけい", age: "30歳", gender: "男性", comment: "アクティビティが趣味で、仕事にも遊びにも常に全力で取り組んでます！仕事は前職がハードウェアエンジニアで、現職はITのプロジェクトマネージャーです。ITに関しては未経験の状態からオフショア開発でネパール人エンジニアをマネジメントして、ウェブシステムやモバイルアプリの開発に携わっています。", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/WatanabeIkkei.jpeg", sessionVideo: "ON", preferredSessionTime: "平日夜間, 土日祝希望" },
	{ id: 12, status: "現職", job: "人事", industry: "IT", yearsOfExperience: 5, nickname: "ますだ", age: "30代", gender: "男性", comment: "現在はITスタートアップで人事をしています。採用や組織開発、人事評価制度の設計など人事領域幅広く経験してきました。", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/man.png", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 13, status: "現職", job: "webデザイナー", industry: "web広告、マーケティング", yearsOfExperience: 2, nickname: "えみ", age: "40代", gender: "女性", comment: "化粧品の広告を制作しています。", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/woman.png", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 14, status: "前職", job: "設計エンジニア", industry: "自動車メーカー", yearsOfExperience: 5, nickname: "てんのう", age: "31歳", gender: "女性", comment: "自動車メーカーで設計エンジニアをしていました。内装やエンジン周りの部品を、CATIAやNXで3Dモデリングしたり、図面を書いていました。", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/AoyamaSaki2.jpeg", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 15, status: "現職", job: "SE", industry: "医療系IT", yearsOfExperience: 3, nickname: "永松", age: "28歳", gender: "男性", comment: "九州出身で就職を機に上京、1社目。顧客は主に病院でアプリケーション導入、納品、カスタマイズ等を担当。設計からプログラミングを浅く広く実施しています。人事に異動を計画中", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/man.png", sessionVideo: "都度相談", preferredSessionTime: "土日祝日中" },
	{ id: 16, status: "現職", job: "CAEエンジニア", industry: "製造業", yearsOfExperience: 8, nickname: "だいちゃん", age: "36歳", gender: "男性", comment: "自動車メーカーを中心にCAE解析関連の様々な現場の困りごと解決のお手伝いをさせていただいてます。チームリーダーとしてシミュレーション用のモデル構築からツール開発まで、様々な業務に関わっています。", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/DaisukeSatoh.jpg", sessionVideo: "ON", preferredSessionTime: "都度相談" },
	{ id: 17, status: "現職", job: "事業会社Bizdev", industry: "金融•決済", yearsOfExperience: 14, nickname: "ゆーすけ", age: "30代", gender: "男性", comment: "事業開発をしてます。プロダクト開発、マーケティング、事業計画、アライアンスなど事業に関わることは広くやってきました。最近は、金融分野のプロダクト企画や中期計画、マーケティングをマネジャーの立場でチームを率いてます。中途採用しながら、チーム拡大中です", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/man.png", sessionVideo: "ON" , preferredSessionTime: "都度相談" },
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
      // IDによる昇順ソート
      return a.id - b.id;
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
					src="https://altosaex.sakura.ne.jp/logo.png"
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
    <SelectItem className="relative p-2 pl-3 pr-10 hover:bg-gray-100 flex justify-between items-center" value="job">
      職業名順
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#3BB4E5]"></span>
			</SelectItem>
			<SelectItem className="relative p-2 pl-3 pr-10 hover:bg-gray-100 flex justify-between items-center" value="yearsOfExperience">
      勤続年数順
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#3BB4E5]"></span>
			</SelectItem>
    
			<SelectItem className="relative p-2 pl-3 pr-10 hover:bg-gray-100 flex justify-between items-center" value="id">
      ID順
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
                    src={post.imageUrl || "/placeholder.svg?height=64&width=64"}
                    alt={`${post.job}のイメージ画像`}
                    layout="fill"
                    objectFit="cover"
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
              <p className="text-gray-700 mt-2 mb-4">{post.comment}</p>
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