# 使用基础镜像
FROM registry.cn-shenzhen.aliyuncs.com/handsfree/certd:${CERTD_VERSION}

# 设置工作目录
WORKDIR /app

# 复制文件到容器中
COPY . /app

# 设置环境变量
ENV TZ=Asia/Shanghai
ENV certd_auth_jwt_secret=${JWT_SECRET}

# 暴露端口
EXPOSE 7001

# 运行命令
CMD ["npm", "start"]
