FROM jrottenberg/ffmpeg:4.4-alpine

RUN apk add --no-cache bash fontconfig ttf-dejavu

WORKDIR /script
COPY start_streams.sh .
RUN chmod +x start_streams.sh

ENTRYPOINT ["/bin/bash", "./start_streams.sh"]
