export interface NewsData {
    articles: Array<{
      title: string;
      description: string;
      url: string;
    }>;
  }
  
  export interface NewsError {
    message: string;
  }