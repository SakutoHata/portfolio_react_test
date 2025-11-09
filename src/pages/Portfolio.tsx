import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, ExternalLink, Code } from "lucide-react"
import { ParticlesBackground } from "@/components/particles-background"
import { ZennIcon } from "@/components/icons/ZennIcon"
import { CredlyIcon } from "@/components/icons/CredlyIcon"
import { OpenAIIcon } from "@/components/icons/OpenAIIcon"
import { ClaudeIcon } from "@/components/icons/ClaudeIcon"
import { HuggingFaceIcon } from "@/components/icons/HuggingFaceIcon"
import { VertexAIIcon } from "@/components/icons/VertexAIIcon"
import { OllamaIcon } from "@/components/icons/OllamaIcon"
import { BedrockIcon } from "@/components/icons/BedrockIcon"
import { StrandsAgentsIcon } from "@/components/icons/StrandsAgentsIcon"
import {
  SiJavascript,
  SiPython,
  SiTerraform,
  SiDocker,
  SiAmazon,
  SiGooglecloud,
  SiLinux,
  SiGit,
  SiHtml5,
  SiCss3,
  SiGnubash,
  SiUv,
  SiLangchain
} from 'react-icons/si'
// import { useGitHubRepos, useGitHubLanguages } from "@/hooks/useGitHub"
// import { useGitHubLanguages } from "@/hooks/useGitHub"
import { useEffect, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

interface LanguageData {
  languages: string[]
  lastUpdated: string
}

export default function PortfolioPage() {
  // const GITHUB_USERNAME = "SakutoHata"
  // 環境変数からGitHub Personal Access Tokenを取得
  // .env.localに VITE_GITHUB_TOKEN=your_token_here と設定
  // const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

  // const { repos, loading: reposLoading, error: reposError } = useGitHubRepos(GITHUB_USERNAME, GITHUB_TOKEN)
  // const { topLanguages, loading: languagesLoading } = useGitHubLanguages(GITHUB_USERNAME, GITHUB_TOKEN)

  // 静的JSONファイルから言語データを読み込む（方針B）
  const [topLanguages, setTopLanguages] = useState<string[]>([])
  const [languagesLoading, setLanguagesLoading] = useState(true)

  useEffect(() => {
    fetch('/portfolio_react_test/github-languages.json')
      .then(res => res.json())
      .then((data: LanguageData) => {
        setTopLanguages(data.languages)
        setLanguagesLoading(false)
      })
      .catch(error => {
        console.error('Failed to load language data:', error)
        setLanguagesLoading(false)
      })
  }, [])

  // アイコンマッピング
  const languageIcons: Record<string, { icon: React.ComponentType<{ className?: string }>, name: string }> = {
    'Python': { icon: SiPython, name: 'Python' },
    // 'TypeScript': { icon: SiTypescript, name: 'TypeScript' },
    'JavaScript': { icon: SiJavascript, name: 'JavaScript' },
    'HCL': { icon: SiTerraform, name: 'HCL' },
    'Shell': { icon: SiGnubash, name: 'Shell' },
    'HTML': { icon: SiHtml5, name: 'HTML' },
    'CSS': { icon: SiCss3, name: 'CSS' }
  }

  const toolIcons: Record<string, { icon: React.ComponentType<{ className?: string }>, name: string }> = {
    'Docker': { icon: SiDocker, name: 'Docker' },
    // 'Kubernetes': { icon: SiKubernetes, name: 'Kubernetes' },
    'AWS': { icon: SiAmazon, name: 'AWS' },
    'GoogleCloud': { icon: SiGooglecloud, name: 'Google Cloud' },
    'Terraform': { icon: SiTerraform, name: 'Terraform' },
    // 'GitHub Actions': { icon: SiGithubactions, name: 'GitHub Actions' },
    'Linux': { icon: SiLinux, name: 'Linux/Ubuntu' },
    'Git': { icon: SiGit, name: 'Git' },
    'uv': { icon: SiUv, name: 'uv' },
    'LangChain': { icon: SiLangchain, name: 'LangChain' },
    'OpenAI': { icon: OpenAIIcon, name: 'OpenAI' },
    'Claude': { icon: ClaudeIcon, name: 'Claude' },
    'HuggingFace': { icon: HuggingFaceIcon, name: 'Hugging Face' },
    'Bedrock': { icon: BedrockIcon, name: 'Amazon Bedrock' },
    'VertexAI': { icon: VertexAIIcon, name: 'Vertex AI' },
    'Ollama': { icon: OllamaIcon, name: 'Ollama' },
    'StrandsAgents': { icon: StrandsAgentsIcon, name: 'Strands Agents' }
  }

  // デバッグ用
  // console.log('Repos:', repos.length, repos)
  // console.log('Loading:', reposLoading)
  // console.log('Error:', reposError)
  // console.log('Token configured:', !!GITHUB_TOKEN)

  // 静的なプロジェクトデータ
  const staticProjects = [
    {
      name: "Portfolio Website",
      description: "現在のサイト。<br>React + Vite + TypeScriptで構築しており、GitHub Pagesでホスティングしている。",
      html_url: "https://github.com/SakutoHata/portfolio_react_test",
      language: "TypeScript",
      topics: ["react", "vite", "typescript"],
      stargazers_count: 0
    },
    {
      name: "社長ボット",
      description: "学生時代のインターンで構築した成果物。<br>社長を模した3Dキャラクターと対話可能なサイトを作成した。対話にはRAGシステムを活用し、社内報での社長コメントなどを参考に社長と話すことを疑似体験できる。",
      html_url: "https://github.com/SakutoHata/president-bot_RAG",
      language: "Python",
      topics: ["Python", "Azure", "gpt", "AWS"],
      stargazers_count: 0
    },
    {
      name: "SynapseX",
      description: "ハッカソンで作成した成果物。<br>Google GenKitフレームワークをベースに、Gemini 2.5 ProとFlashモデルを適材適所で使い分け、10人の異なる専門分野を持つAIエージェントが協働する独自のマルチエージェントシステムを構築した。",
      html_url: "https://github.com/SakutoHata/SynapseX",
      language: "TypeScript",
      topics: ["JavaScript","TypeScript", "Gemini"],
      stargazers_count: 0
    },
    {
      name: "Notion MCP + AgentCoreBrowser の検証",
      description: "社内ブログを執筆するに当たり作成。<br>Amazon Bedrock AgentCoreにてRuntimeでNotion MCPをホストした。<br>ブラウザ機能と組み合わせることで、インターネット/Notion内部での検索機能と、検索結果をNotionに纏める機能を持ち合わせたAIエージェントを構築した。",
      html_url: "https://github.com/SakutoHata/bedrock-agentcore_withNotionMCP",
      language: "Python",
      topics: ["Python", "Strands Agent", "Amazon Bedrock AgentCore", "MCP", "Claude"],
      stargazers_count: 0
    },
  ]

  // 静的なハッカソンデータ
  const staticHackathons = [
    {
      name: "第2回 AI Agent Hackathon with Google Cloud",
      description: "上記のZennオンラインハッカソンに参加。この際、SynapseXを作成した。",
      html_url: "https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2",
      date: "2025/06",
      topics: ["JavaScript", "TypeScript", "Gemini", "Multi-Agent"],
    },
  ]

  // 静的なブログデータ
  const staticBlogs = [
    {
      name: "大学からITをはじめた学生のエンジニア就活の備忘録",
      description: "大学生時代の振り返りを大まかに纏めたもの。",
      html_url: "https://zenn.dev/sakuto_hata/articles/fea92a28c76b66",
      date: "2024/11/05",
      topics: ["備忘録", "zenn"],
    },

  ]

  // 静的な登壇データ
  const staticSpeaking = [
    {
      title: "25新卒がBedrock AgentCore Runtimeに触ってみた話",
      name: "【AWS】AWS10分LT会 - vol.6",
      description: "人生初の登壇。当時demo版だった、Amazon Bedrock AgentCoreについて話しました。",
      html_url: "https://aws-likers.connpass.com/event/363359/",
      date: "2025/08",
      topics: ["登壇", "AWS10分LT会"],
    },
  ]

  // カルーセル設定
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  return (
    <div className="min-h-screen relative">
      <ParticlesBackground />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-8 flex-wrap md:flex-nowrap">
            <div className="flex-1">
              <h1 className="font-bold text-5xl md:text-7xl text-balance mb-4">Sakuto Hata</h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-6">インフラエンジニア</p>
              <p
                className="text-lg text-foreground/80 leading-relaxed max-w-3xl"
                dangerouslySetInnerHTML={{
                  __html: `ポートフォリオをご覧いただきありがとうございます。<br>
                          私は高校生の頃、初めてスマートフォンに触れ、甚く感動しプログラミングに興味を持ったことがこの道へ進んだきっかけでした。また、当時から数学が好きで「AI技術」に興味があったこともこの道へ進む後押しの一因でした。<br>
                          大学ではAI全般を学び、インターン先でAIとクラウドに触れ、MLOps・AIOps・LLMOpsに興味を持ちクラウド業界を目指すこととなりました。<br>
                          現在は、日本大手のクラウドインテグレーターに所属しております。`
                }}
              />

              {/* Social Links */}
              <div className="flex gap-4 mt-8">
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://github.com/SakutoHata" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://lit.link/saku-hata" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://zenn.dev/sakuto_hata" target="_blank" rel="noopener noreferrer" aria-label="Zenn">
                    <ZennIcon className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://www.credly.com/users/sakuto-hata" target="_blank" rel="noopener noreferrer" aria-label="Credly">
                    <CredlyIcon className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Circular Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-foreground/10 shadow-2xl">
                <img src="/portfolio_react_test/professional-portrait.png" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="container mx-auto px-4 py-16 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-wide mb-8 text-center bg-background/80 backdrop-blur-sm py-3 px-6 rounded-lg inline-block shadow-lg mx-auto block w-fit">
              About Me
            </h2>
            <Card className="p-6 hover:border-foreground/20 transition-colors">
              <div className="space-y-6 text-foreground/80 leading-relaxed">
                <p
                  className="text-lg"
                  dangerouslySetInnerHTML={{
                    __html: `技術領域は主にクラウド、AIに関することです。<br>
                            Python言語をメインに、広く浅く学んでまいりました。<br>
                            私自身、新しいこと、知らないことから学びを得ることが大好きです。<br>
                            MLOpsのドメインが豊富、かつフルスタックなエンジニアを目指しています。`
                  }}
                />
                <p
                  className="text-lg"
                  dangerouslySetInnerHTML={{
                    __html: `私の座右の銘は「七転び八起」です。<br>
                            何故なら、「できないことをできるまで」何度でも諦めず結果を出せるまで挑戦し続けることが私のモットーであるからです。<br>
                            常に新しい視点や知識を取り入れながら課題解決に臨み続ける、そんなエンジニアでありたい、と思います。`
                  }}
                />
              </div>
            </Card>
          </div>
        </section>

        {/* Skills Section */}
        <section className="container mx-auto px-4 py-16 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-wide mb-8 text-center bg-background/80 backdrop-blur-sm py-3 px-6 rounded-lg inline-block shadow-lg mx-auto block w-fit">
              Skills
            </h2>
            <Card className="p-6">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Code className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-medium">Programming Languages</h3>
                  </div>
                  {languagesLoading ? (
                    <p className="text-muted-foreground">Loading...</p>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
                      {topLanguages.map((lang) => {
                        const iconData = languageIcons[lang]
                        if (!iconData) return null
                        const Icon = iconData.icon
                        return (
                          <div
                            key={lang}
                            className="flex flex-col items-center gap-2 group cursor-pointer transition-transform hover:scale-110"
                          >
                            <div className="p-2 rounded-lg bg-secondary/50 group-hover:bg-secondary transition-colors">
                              <Icon className="w-8 h-8 sm:w-9 sm:h-9" />
                            </div>
                            <span className="text-xs sm:text-sm text-center text-muted-foreground group-hover:text-foreground transition-colors">
                              {iconData.name}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-6">Technologies & Tools</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
                    {Object.entries(toolIcons).map(([key, { icon: Icon, name }]) => (
                      <div
                        key={key}
                        className="flex flex-col items-center gap-2 group cursor-pointer transition-transform hover:scale-110"
                      >
                        <div className="p-2 rounded-lg bg-secondary/50 group-hover:bg-secondary transition-colors">
                          <Icon className="w-8 h-8 sm:w-9 sm:h-9" />
                        </div>
                        <span className="text-xs sm:text-sm text-center text-muted-foreground group-hover:text-foreground transition-colors">
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="container mx-auto px-4 py-16 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-wide mb-8 text-center bg-background/80 backdrop-blur-sm py-3 px-6 rounded-lg inline-block shadow-lg mx-auto block w-fit">
              Certifications
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              <a
                href="https://www.credly.com/users/sakuto-hata"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform hover:scale-105"
                aria-label="AWS Certified AI Practitioner"
              >
                <img
                  src="/portfolio_react_test/aws-certified-ai-practitioner.png"
                  alt="AWS Certified AI Practitioner"
                  className="w-32 h-32 md:w-40 md:h-40 object-contain"
                />
              </a>
              <a
                href="https://www.credly.com/users/sakuto-hata"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform hover:scale-105"
                aria-label="AWS Certified Cloud Practitioner"
              >
                <img
                  src="/portfolio_react_test/aws-certified-cloud-practitioner.png"
                  alt="AWS Certified Cloud Practitioner"
                  className="w-32 h-32 md:w-40 md:h-40 object-contain"
                />
              </a>
              <a
                href="https://www.credly.com/users/sakuto-hata"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform hover:scale-105"
                aria-label="Cloud Digital Leader"
              >
                <img
                  src="/portfolio_react_test/cloud-digital-leader.png"
                  alt="Cloud Digital Leader"
                  className="w-32 h-32 md:w-40 md:h-40 object-contain"
                />
              </a>
            </div>
          </div>
        </section>
        {/* Projects Section */}
        <section className="container mx-auto px-4 py-16 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-wide mb-8 text-center bg-background/80 backdrop-blur-sm py-3 px-6 rounded-lg inline-block shadow-lg mx-auto block w-fit">
              Projects
            </h2>
            {staticProjects.length === 1 ? (
              <div>
                <Card className="p-8 hover:border-foreground/20 transition-colors">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-medium break-words flex-1">{staticProjects[0].name}</h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {staticProjects[0].stargazers_count > 0 && (
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            ⭐ {staticProjects[0].stargazers_count}
                          </span>
                        )}
                        <Button variant="ghost" size="icon" asChild>
                          <a href={staticProjects[0].html_url} target="_blank" rel="noopener noreferrer" aria-label="View project">
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        </Button>
                      </div>
                    </div>
                    {staticProjects[0].description && (
                      <p
                        className="text-foreground/80 leading-relaxed text-base"
                        dangerouslySetInnerHTML={{ __html: staticProjects[0].description }}
                      />
                    )}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {staticProjects[0].language && (
                        <Badge variant="outline" className="text-sm">{staticProjects[0].language}</Badge>
                      )}
                      {staticProjects[0].topics.slice(0, 5).map((topic) => (
                        <Badge key={topic} variant="outline" className="text-sm">{topic}</Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
              <>
                <Carousel
                  setApi={setApi}
                  className="w-full"
                  opts={{
                    align: "center",
                    loop: true,
                    containScroll: "trimSnaps",
                  }}
                  plugins={[
                    Autoplay({
                      delay: 4000,
                      stopOnInteraction: true,
                      stopOnMouseEnter: true,
                    }),
                  ]}
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {staticProjects.map((project, index) => (
                      <CarouselItem key={index} className="pl-2 md:pl-4 basis-full">
                        <div className="p-1">
                          <Card className="p-8 hover:border-foreground/20 transition-colors h-full">
                            <div className="space-y-4 flex flex-col min-h-[280px]">
                              <div className="flex items-start justify-between gap-4">
                                <h3 className="text-2xl font-medium break-words flex-1">{project.name}</h3>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  {project.stargazers_count > 0 && (
                                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                                      ⭐ {project.stargazers_count}
                                    </span>
                                  )}
                                  <Button variant="ghost" size="icon" asChild>
                                    <a href={project.html_url} target="_blank" rel="noopener noreferrer" aria-label="View project">
                                      <ExternalLink className="h-5 w-5" />
                                    </a>
                                  </Button>
                                </div>
                              </div>
                              {project.description && (
                                <p
                                  className="text-foreground/80 leading-relaxed text-base flex-grow break-words"
                                  dangerouslySetInnerHTML={{ __html: project.description }}
                                />
                              )}
                              <div className="flex flex-wrap gap-2 pt-2 mt-auto">
                                {project.language && (
                                  <Badge variant="outline" className="text-sm">{project.language}</Badge>
                                )}
                                {project.topics.slice(0, 5).map((topic) => (
                                  <Badge key={topic} variant="outline" className="text-sm">{topic}</Badge>
                                ))}
                              </div>
                            </div>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                <div className="text-center mt-6 text-sm text-muted-foreground">
                  スライド {current} / {count}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Hackathon Section */}
        <section className="container mx-auto px-4 py-16 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-wide mb-8 text-center bg-background/80 backdrop-blur-sm py-3 px-6 rounded-lg inline-block shadow-lg mx-auto block w-fit">
              Hackathon
            </h2>
            {staticHackathons.length === 1 ? (
              <div>
                <Card className="p-8 hover:border-foreground/20 transition-colors">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-medium break-words flex-1">{staticHackathons[0].name}</h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-sm text-muted-foreground">{staticHackathons[0].date}</span>
                        <Button variant="ghost" size="icon" asChild>
                          <a href={staticHackathons[0].html_url} target="_blank" rel="noopener noreferrer" aria-label="View hackathon project">
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        </Button>
                      </div>
                    </div>
                    {staticHackathons[0].description && (
                      <p
                        className="text-foreground/80 leading-relaxed text-base"
                        dangerouslySetInnerHTML={{ __html: staticHackathons[0].description }}
                      />
                    )}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {staticHackathons[0].topics.slice(0, 5).map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-sm">{topic}</Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
              <>
                <Carousel
                  setApi={setApi}
                  className="w-full"
                  opts={{
                    align: "center",
                    loop: true,
                    containScroll: "trimSnaps",
                  }}
                  plugins={[
                    Autoplay({
                      delay: 4000,
                      stopOnInteraction: true,
                      stopOnMouseEnter: true,
                    }),
                  ]}
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {staticHackathons.map((hackathon, index) => (
                      <CarouselItem key={index} className="pl-2 md:pl-4 basis-full">
                        <div className="p-1">
                          <Card className="p-8 hover:border-foreground/20 transition-colors h-full">
                            <div className="space-y-4 flex flex-col min-h-[280px]">
                              <div className="flex items-start justify-between gap-4">
                                <h3 className="text-2xl font-medium break-words flex-1">{hackathon.name}</h3>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <span className="text-sm text-muted-foreground">{hackathon.date}</span>
                                  <Button variant="ghost" size="icon" asChild>
                                    <a href={hackathon.html_url} target="_blank" rel="noopener noreferrer" aria-label="View hackathon project">
                                      <ExternalLink className="h-5 w-5" />
                                    </a>
                                  </Button>
                                </div>
                              </div>
                              {hackathon.description && (
                                <p
                                  className="text-foreground/80 leading-relaxed text-base flex-grow break-words"
                                  dangerouslySetInnerHTML={{ __html: hackathon.description }}
                                />
                              )}
                              <div className="flex flex-wrap gap-2 pt-2 mt-auto">
                                {hackathon.topics.slice(0, 5).map((topic) => (
                                  <Badge key={topic} variant="secondary" className="text-sm">{topic}</Badge>
                                ))}
                              </div>
                            </div>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                <div className="text-center mt-6 text-sm text-muted-foreground">
                  スライド {current} / {count}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Blog Section */}
        <section className="container mx-auto px-4 py-16 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-wide mb-8 text-center bg-background/80 backdrop-blur-sm py-3 px-6 rounded-lg inline-block shadow-lg mx-auto block w-fit">
              Blog
            </h2>
            {staticBlogs.length === 1 ? (
              <div>
                <Card className="p-8 hover:border-foreground/20 transition-colors">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-medium break-words flex-1">{staticBlogs[0].name}</h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-sm text-muted-foreground">{staticBlogs[0].date}</span>
                        <Button variant="ghost" size="icon" asChild>
                          <a href={staticBlogs[0].html_url} target="_blank" rel="noopener noreferrer" aria-label="View blog">
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        </Button>
                      </div>
                    </div>
                    {staticBlogs[0].description && (
                      <p
                        className="text-foreground/80 leading-relaxed text-base"
                        dangerouslySetInnerHTML={{ __html: staticBlogs[0].description }}
                      />
                    )}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {staticBlogs[0].topics.slice(0, 5).map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-sm">{topic}</Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
              <>
                <Carousel
                  setApi={setApi}
                  className="w-full"
                  opts={{
                    align: "center",
                    loop: true,
                    containScroll: "trimSnaps",
                  }}
                  plugins={[
                    Autoplay({
                      delay: 4000,
                      stopOnInteraction: true,
                      stopOnMouseEnter: true,
                    }),
                  ]}
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {staticBlogs.map((blog, index) => (
                      <CarouselItem key={index} className="pl-2 md:pl-4 basis-full">
                        <div className="p-1">
                          <Card className="p-8 hover:border-foreground/20 transition-colors h-full">
                            <div className="space-y-4 flex flex-col min-h-[280px]">
                              <div className="flex items-start justify-between gap-4">
                                <h3 className="text-2xl font-medium break-words flex-1">{blog.name}</h3>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <span className="text-sm text-muted-foreground">{blog.date}</span>
                                  <Button variant="ghost" size="icon" asChild>
                                    <a href={blog.html_url} target="_blank" rel="noopener noreferrer" aria-label="View blog">
                                      <ExternalLink className="h-5 w-5" />
                                    </a>
                                  </Button>
                                </div>
                              </div>
                              {blog.description && (
                                <p
                                  className="text-foreground/80 leading-relaxed text-base flex-grow break-words"
                                  dangerouslySetInnerHTML={{ __html: blog.description }}
                                />
                              )}
                              <div className="flex flex-wrap gap-2 pt-2 mt-auto">
                                {blog.topics.slice(0, 5).map((topic) => (
                                  <Badge key={topic} variant="secondary" className="text-sm">{topic}</Badge>
                                ))}
                              </div>
                            </div>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                <div className="text-center mt-6 text-sm text-muted-foreground">
                  スライド {current} / {count}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Speaking Section */}
        <section className="container mx-auto px-4 py-16 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-wide mb-8 text-center bg-background/80 backdrop-blur-sm py-3 px-6 rounded-lg inline-block shadow-lg mx-auto block w-fit">
              Speaking
            </h2>
            {staticSpeaking.length === 1 ? (
              <div>
                <Card className="p-8 hover:border-foreground/20 transition-colors">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <h3 className="text-2xl font-bold break-words">{staticSpeaking[0].title}</h3>
                        <p className="text-lg text-muted-foreground">{staticSpeaking[0].name}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-sm text-muted-foreground">{staticSpeaking[0].date}</span>
                        <Button variant="ghost" size="icon" asChild>
                          <a href={staticSpeaking[0].html_url} target="_blank" rel="noopener noreferrer" aria-label="View speaking">
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        </Button>
                      </div>
                    </div>
                    {staticSpeaking[0].description && (
                      <p
                        className="text-foreground/80 leading-relaxed text-base"
                        dangerouslySetInnerHTML={{ __html: staticSpeaking[0].description }}
                      />
                    )}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {staticSpeaking[0].topics.slice(0, 5).map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-sm">{topic}</Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
              <>
                <Carousel
                  setApi={setApi}
                  className="w-full"
                  opts={{
                    align: "center",
                    loop: true,
                    containScroll: "trimSnaps",
                  }}
                  plugins={[
                    Autoplay({
                      delay: 4000,
                      stopOnInteraction: true,
                      stopOnMouseEnter: true,
                    }),
                  ]}
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {staticSpeaking.map((speaking, index) => (
                      <CarouselItem key={index} className="pl-2 md:pl-4 basis-full">
                        <div className="p-1">
                          <Card className="p-8 hover:border-foreground/20 transition-colors h-full">
                            <div className="space-y-4 flex flex-col min-h-[280px]">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 space-y-2">
                                  <h3 className="text-2xl font-bold break-words">{speaking.title}</h3>
                                  <p className="text-lg text-muted-foreground">{speaking.name}</p>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <span className="text-sm text-muted-foreground">{speaking.date}</span>
                                  <Button variant="ghost" size="icon" asChild>
                                    <a href={speaking.html_url} target="_blank" rel="noopener noreferrer" aria-label="View speaking">
                                      <ExternalLink className="h-5 w-5" />
                                    </a>
                                  </Button>
                                </div>
                              </div>
                              {speaking.description && (
                                <p
                                  className="text-foreground/80 leading-relaxed text-base flex-grow break-words"
                                  dangerouslySetInnerHTML={{ __html: speaking.description }}
                                />
                              )}
                              <div className="flex flex-wrap gap-2 pt-2 mt-auto">
                                {speaking.topics.slice(0, 5).map((topic) => (
                                  <Badge key={topic} variant="secondary" className="text-sm">{topic}</Badge>
                                ))}
                              </div>
                            </div>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                <div className="text-center mt-6 text-sm text-muted-foreground">
                  スライド {current} / {count}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 border-t border-border">
          <div className="max-w-4xl mx-auto text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              <a
                href="https://sakutohata.github.io/Portfolio-site/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline"
              >
                旧ポートフォリオサイト
              </a>
            </p>
            <p className="text-sm text-muted-foreground">© 2025 Sakuto Hata. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
