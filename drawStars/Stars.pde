class Stars
{
  int starsNum;//静态星星的数量
  int maxX;//星星的分布范围
  int maxY;
  PVector []starsp;//星星的位置
  int meteorNum;//流星的数量
  PVector []position;//流星的位置
  PVector []velocity;//流星的速度
 
  Stars(int num1,int num2,int maxX,int maxY)
  {
    meteorNum=num1;
    starsNum=num2;
    starsp=new PVector[starsNum];
    position=new PVector[meteorNum];//流星的位置
    velocity=new PVector[meteorNum];//控制流星的向量
   
   //初始化星空，随机生成星星
    int x,y;
    float xoff=0.0,yoff=10500.0;
    for (int i=0;i<starsNum;i++)
    {    
       x=int(map(noise(xoff),0,1,0,maxX+200));
       y=int(map(noise(yoff),0,1,0,maxY+0));
       point(x,y);
       starsp[i]= new PVector(x, y);
       yoff+=30;
       xoff+=0.5;
    }
   //随机生成流星初始位置

    for (int i=0;i<meteorNum;i++)
    {
     x=int(random(maxX));
     y=int(random(maxY));
     position[i]=new PVector(x,y);
     
     x=int(random(1.0,2.0));
     y=int(random(1.0,2.0));
     velocity[i]= new PVector(x, y);
    }
  }

  void display()
  {
    //画流星
    stroke(random(255),random(255),random(255));
   for (int i=0;i<meteorNum;i++)
   {
   
    if (i>meteorNum/2)
    {
     point(position[i].x, position[i].y);
    }
    else
    {
       float size=random(1.5);
       ellipse(position[i].x, position[i].y,size, size);    
    }
    
   }
   //画普通星星
   for (int i=0;i<starsNum;i++)
   {
    
     if (i%20==0)//每隔20颗，画一个大小随机的星星
     {
        stroke(#edccf7);
        int flag=int(random(50));
        float size=random(1);
        if(flag>48)
        {
          stroke(#edccf7);
        }
        ellipse(starsp[i].x,starsp[i].y,size, size);
     }
     else//画大小为一个点的星星
     {
         //随机闪烁
        stroke(#888deb);
        int flag=int(random(50));
        if(flag>48)
        {
          stroke(#edccf7);
        }
        
        point(starsp[i].x,starsp[i].y);
     }
  }
  
  }
  void update(float v)
  {
    
     for (int i=0;i<meteorNum;i++)
     {
       velocity[i].x = v;
       velocity[i].y = v;
       
      position[i].add(velocity[i]);
     }
  }

void checkEdges()
{  //检查边界
  for (int i=0;i<meteorNum;i++)
  {
    if (position[i].x > width) 
    {
        position[i].x = 0;
    } else if (position[i].x < 0)
    {
        position[i].x = width;
    }
  
    if (position[i].y > height)
    {
        position[i].y = 0;
    } else if (position[i].y < 0) 
    {
        position[i].y = height;
    }
  }
}
}
