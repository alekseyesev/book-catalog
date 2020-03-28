<?php

require "AbstractEventLoop.class.php";

class EventLoop extends AbstractEventLoop
{
    private $context;
    private $event_type;
    public function __construct(callable $get_response_output, string $event_type = "message", ?object $context)
    {
        $this->get_response_output = $get_response_output;
        $this->timeout = 1;
        $this->context = $context;
        $this->event_type = $event_type;
        $this->set_response_header();
        $this->start();
    }
    public function __get($property)
    {
        switch ($property) {
            case "response_output":
            return $this->get_response_output->call($this->context);
            default:
            return null;
        }
    }
    private function set_response_header()
    {
        header("Content-Type: text/event-stream");
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Expose-Headers: *");
        header("Access-Control-Allow-Credentials: true");
    }
    private function start()
    {
        set_time_limit(0);
        
        while (true) {
            if ($output = $this->response_output) {
                echo $this::format_data($output, $this->event_type);
            }

            $this->send_response();
          
            if (!$this->has_listeners()) {
                $this->stop();
            }
          
            sleep($this->timeout);
        }
    }
    private function send_response()
    {
        while (ob_get_level() > 0) {
            ob_end_flush();
        }
        flush();
    }
    private function has_listeners(): bool
    {
        return ! connection_aborted();
    }
    private function stop()
    {
        die();
    }
}
