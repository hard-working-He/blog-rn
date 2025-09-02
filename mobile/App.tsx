import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity,
  ActivityIndicator,
  Linking
} from 'react-native'
import RenderHtml from 'react-native-render-html'
import { useWindowDimensions } from 'react-native'
import axios from 'axios'

interface Post {
  id: string
  title: string
  content: string
  slug: string
  createdAt: string
}

export default function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const { width } = useWindowDimensions()

  const API_BASE_URL = 'http://localhost:3000' // Change this to your deployed URL

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/posts`)
      setPosts(response.data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const openWebBlog = () => {
    Linking.openURL(API_BASE_URL)
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#e91e63" />
        <Text style={styles.loadingText}>加载博客中...</Text>
        <StatusBar style="auto" />
      </View>
    )
  }

  if (selectedPost) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedPost(null)}
          >
            <Text style={styles.backButtonText}>← 返回</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{selectedPost.title}</Text>
          <Text style={styles.headerSubtitle}>
            {new Date(selectedPost.createdAt).toLocaleDateString('zh-CN')}
          </Text>
        </View>
        
        <ScrollView style={styles.content}>
          <RenderHtml
            contentWidth={width - 80}
            source={{ html: selectedPost.content }}
            tagsStyles={{
              body: { color: '#333', lineHeight: 24 },
              h1: { color: '#de6b92', fontSize: 24, fontWeight: '600' },
              h2: { color: '#de6b92', fontSize: 20, fontWeight: '600' },
              h3: { color: '#555', fontSize: 18, fontWeight: '500' },
              p: { marginBottom: 16, lineHeight: 24 },
              code: { 
                backgroundColor: '#f8f9fa', 
                padding: 4, 
                borderRadius: 4,
                fontFamily: 'monospace'
              },
                             pre: {
                 backgroundColor: '#2d3748',
                 color: '#e2e8f0',
                 padding: 16,
                 borderRadius: 8,
               }
            }}
          />
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>我的博客</Text>
        <Text style={styles.headerSubtitle}>React Native 客户端</Text>
        <TouchableOpacity 
          style={styles.webButton}
          onPress={openWebBlog}
        >
          <Text style={styles.webButtonText}>在网页中打开</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {posts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>暂无博客文章</Text>
            <Text style={styles.emptySubtext}>请在网页端创建您的第一篇博客</Text>
          </View>
        ) : (
          posts.map((post) => (
            <TouchableOpacity
              key={post.id}
              style={styles.postCard}
              onPress={() => setSelectedPost(post)}
            >
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postDate}>
                {new Date(post.createdAt).toLocaleDateString('zh-CN')}
              </Text>
              <RenderHtml
                contentWidth={width - 120}
                source={{ 
                  html: post.content.substring(0, 200) + '...' 
                }}
                tagsStyles={{
                  body: { color: '#666', fontSize: 14 },
                  p: { marginBottom: 8 }
                }}
              />
              <Text style={styles.readMore}>点击阅读全文</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fce5e6',
  },
  header: {
    backgroundColor: '#ff9a9e',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginBottom: 20,
  },
  webButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  webButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#e91e63',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#de6b92',
    marginBottom: 8,
  },
  postDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  readMore: {
    fontSize: 14,
    color: '#e91e63',
    fontWeight: '600',
    marginTop: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 20,
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
})
