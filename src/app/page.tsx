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
  age: number
  gender: string
  comment: string
	imageUrl?: string
	sessionVideo: "ON" | "OFF"
	preferredSessionTime: string
}

const dummyPosts: Post[] = [
  { id: 1, status: "現職", job: "プロコーチ", industry: "コーチング", yearsOfExperience: 5, nickname: "望月 彩恵", age: 39, gender: "女性", comment: "コーチとして独立して5年。コーチングスクール講師業や企業研修支援など、法人／個人問わず、日々色々な方の目標達成支援を行っております。", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/MochizukiSae.png", sessionVideo: "ON", preferredSessionTime: "都度相談" },
  { id: 2, status: "現職", job: "データサイエンティスト", industry: "IT", yearsOfExperience: 5, nickname: "数字の魔術師", age: 28, gender: "男性", comment: "データから価値ある洞察を引き出すのが得意です。", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/man.png", sessionVideo: "OFF" , preferredSessionTime: "平日夜間希望" },
  { id: 3, status: "前職", job: "小学校教師", industry: "教育", yearsOfExperience: 15, nickname: "笑顔の先生", age: 45, gender: "女性", comment: "子どもたちの成長を見守るのが最高の喜びでした。", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/woman.png", sessionVideo: "ON" , preferredSessionTime: "土日夜間希望" },
  { id: 4, status: "現職", job: "建築家", industry: "建設", yearsOfExperience: 12, nickname: "空間の魔法使い", age: 40, gender: "男性", comment: "持続可能な都市設計に情熱を注いでいます。", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/man.png", sessionVideo: "ON" , preferredSessionTime: "平日午後希望" },
  { id: 5, status: "現職", job: "フリーランスライター", industry: "メディア", yearsOfExperience: 8, nickname: "言葉の職人", age: 35, gender: "女性", comment: "多様なトピックを分かりやすく伝えるのが私の使命です。", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/woman.png", sessionVideo: "ON" , preferredSessionTime: "午前中希望" },
  { id: 6, status: "前職", job: "プロサッカー選手", industry: "スポーツ", yearsOfExperience: 10, nickname: "フィールドの閃光", age: 33, gender: "男性", comment: "チームワークの大切さを身をもって学びました。", imageUrl: "https://altosaex.sakura.ne.jp/jobimg/man.png", sessionVideo: "OFF" , preferredSessionTime: "週末午後希望" },
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
        return b.yearsOfExperience - a.yearsOfExperience
      } else if (sort === "age") {
        return b.age - a.age
      } else {
        return a.job.localeCompare(b.job)
      }
    })

    setPosts(filteredPosts)
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-[#E6F7FF] to-[#FFFFFF] min-h-screen font-sans relative">
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
    <SelectItem className="relative p-2 pl-3 pr-10 hover:bg-gray-100 flex justify-between items-center" value="yearsOfExperience">
      勤続年数順
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#3BB4E5]"></span>
    </SelectItem>
    <SelectItem className="relative p-2 pl-3 pr-10 hover:bg-gray-100 flex justify-between items-center" value="age">
      年齢順
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#3BB4E5]"></span>
    </SelectItem>
    <SelectItem className="relative p-2 pl-3 pr-10 hover:bg-gray-100 flex justify-between items-center" value="job">
      職業名順
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
                <span>{post.age}歳 / {post.gender}</span>
							</div>
							<Separator className="my-2" />
              <p className="text-gray-700 mt-2 mb-4">{post.comment}</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between bg-gray-100 rounded-md p-2">
                  <span className="text-sm font-medium text-gray-700">セッション時</span>
                  <div className="flex items-center gap-2">
                    {post.sessionVideo === "ON" ? (
                      <Video className="w-5 h-5 text-[#3BB4E5]" />
                    ) : (
                      <VideoOff className="w-5 h-5 text-[#3BB4E5]" />
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