import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen w-full justify-center px-4 md:px-10">
      <div className="flex flex-col items-center text-center justify-center py-20 md:py-20 max-w-5xl mx-auto">
        <h1 className="text-4xl flex gap-4 md:text-6xl font-bold leading-tight">
          <span className="bg-gradient-to-b flex from-blue-300/60 to-blue-300 text-transparent bg-clip-text">
            Reach Your Customers{" "}
          </span>
          <span>Smarter.</span>
        </h1>

        <p className="text-lg md:text-2xl my-6 text-muted-foreground">
          Create personalized campaigns and track delivery with ease.
        </p>

        <Link to="/login">
          <Button className="text-base md:text-lg">
            Get Started <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Home
