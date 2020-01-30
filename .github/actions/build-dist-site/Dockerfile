FROM ruby:2-slim
LABEL author="Johann M. Barnard"
LABEL version="1.0.0"

# Make sure the locale is set up right!
ENV LC_ALL C.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

# Install dependencies
RUN apt-get update && \
    apt-get install --no-install-recommends -y \
    bats \
    build-essential \
    ca-certificates \
    curl \
    libffi6 \
    make \
    shellcheck \
    git-all \
    && gem install bundler \
    && bundle config --global silence_root_warning 1 \
    && bash -c 'curl -sL https://deb.nodesource.com/setup_13.x | bash -' \
    && apt-get install -y nodejs

COPY entrypoint.bash /

# Use entrypoint.sh as container entrypoint when GitHub executes the container
ENTRYPOINT ["bash", "/entrypoint.bash"]
